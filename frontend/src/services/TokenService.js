import { APPLICATION_V1_JSON_TYPE, paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.TOKEN;

export class UserService {
  async getToken(username, password) {
    const user = JSON.stringify({
      username,
      password,
    });

    return resultFetch(this.basePath, {
      method: "POST",
      headers: {
        "Content-Type": APPLICATION_V1_JSON_TYPE,
      },
      body: user,
    });
  }
}
