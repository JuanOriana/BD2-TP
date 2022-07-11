import { Result } from "../types";
import { authedFetch } from "./authedFetch";
import { checkError } from "./checkError";

export async function resultFetch(url, options) {
  try {
    let parsedResponse;
    let newOptions = { ...options };
    newOptions.headers = { ...options.headers };
    const token = localStorage.getItem("token");
    if (token) {
      newOptions.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await authedFetch(url, newOptions);
    parsedResponse = await checkError(response);

    return Result.ok(parsedResponse);
  } catch (err) {
    return Result.failed(err.message);
  }
}
