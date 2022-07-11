import { APPLICATION_V1_JSON_TYPE, paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.TOKEN;

export class TokenService {
  async getToken(username, password) {
    const user = JSON.stringify({
      username,
      password,
    });

    return resultFetch(basePath, {
      method: "POST",
      headers: {
        "Content-Type": APPLICATION_V1_JSON_TYPE,
      },
      body: user,
    });
  }
}
