import { APPLICATION_V1_JSON_TYPE, paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.TOKEN;

export class TokenService {
  async getToken(username, password) {
    const body = `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`;

    return resultFetch(basePath, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    });
  }
}