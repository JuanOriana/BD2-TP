import { APPLICATION_V1_JSON_TYPE, paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.LINKS;

export class LinkService {
  async getLinks(page, pageSize) {
    return resultFetch(basePath);
  }

  async getLinkByKey(key) {
    return resultFetch(basePath + "/" + key, {
      method: "GET",
    });
  }

  async getLinkMetadataByKey(key) {
    return resultFetch(basePath + "/" + key + "/metadata", {
      method: "GET",
    });
  }

  async deleteLinkByKey(key) {
    return resultFetch(basePath + "/" + key, {
      method: "DELETE",
    });
  }

  async newLink(targetUrl, title, shortUrl) {
    const newUser = JSON.stringify({
      target_url: targetUrl,
      title: title,
      short_url: shortUrl,
    });

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
