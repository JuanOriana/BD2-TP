import { paths } from "../common/constants";

import { resultFetch } from "../scripts/resultFetch";
const basePath = paths.BASE_URL + paths.PLANS;

export class PlanService {
  async getPlans(page, pageSize) {
    return resultFetch(basePath);
  }

  async getPlanById(id) {
    return resultFetch(basePath + "/" + id, {
      method: "GET",
    });
  }
}
