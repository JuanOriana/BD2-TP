import { APPLICATION_V1_JSON_TYPE, paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.USERS;

export class UserService {
  async getUsers(page, pageSize) {
    return resultFetch(basePath + `?page=${page}&page_size=${pageSize}`,{method:"GET"});
  }

  async getUserById(userId) {
    return resultFetch(basePath + "/" + userId, {
      method: "GET",
    });
  }

  async getCurrentUser() {
    return resultFetch(basePath + "/me", {
      method: "GET",
    });
  }

  async getUserLinks(userId, page, pageSize) {
    return resultFetch(basePath + "/" + userId + "/links", {
      method: "GET",
    });
  }

  async getUserPlan(userId) {
    return resultFetch(basePath + "/" + userId + "/plan", {
      method: "GET",
    });
  }

  async newUser(username, email, password) {
    const newUser = JSON.stringify({
      username,
      email,
      password,
    });

    // if (confirmPassword !== password) {
    //   return Result.failed(
    //     new ErrorResponse(409, "Confirm password must match with password")
    //   );
    // }

    return resultFetch(basePath, {
      method: "POST",
      headers: {
        "Content-Type": APPLICATION_V1_JSON_TYPE,
      },
      body: newUser,
    });
  }

  async deleteUserById(userId) {
    return resultFetch(basePath + "/" + userId, {
      method: "DELETE",
    });
  }
}
