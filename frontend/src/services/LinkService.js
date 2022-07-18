import { APPLICATION_V1_JSON_TYPE, paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.LINKS;

export class LinkService {
  async getLinks(page, pageSize) {
    return resultFetch(basePath + `?page=${page}&page_size=${pageSize}`, { method: "GET" });
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
    const newLink = JSON.stringify({
      target_url: targetUrl,
      title: title,
      short_url: shortUrl,
    });

    return resultFetch(basePath, {
      method: "POST",
      headers: {
        "Content-Type": APPLICATION_V1_JSON_TYPE,
      },
      body: newLink,
    });
  }

  async editLink(originalShortUrl, title, shortUrl) {
    const newLink = JSON.stringify({
      title: title,
      short_url: shortUrl,
    });

    return resultFetch(basePath + "/" + originalShortUrl, {
      method: "PUT",
      headers: {
        "Content-Type": APPLICATION_V1_JSON_TYPE,
      },
      body: newLink,
    });
  }

  async deleteUserById(userId) {
    return resultFetch(basePath + "/" + userId, {
      method: "DELETE",
    });
  }
}
