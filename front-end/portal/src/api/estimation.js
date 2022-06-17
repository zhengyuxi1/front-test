import request from "@/utils/request";
export default {
  listEstimationWords() {
    return request({
      url: "/ve/estimation/listEstimationWords",
      method: "get"
    });
  },
  calculate(levelRightCounts) {
    return request({
      url: "/ve/estimation/calculate",
      method: "post",
      params: {
        idCard:levelRightCounts,
        ic:'1,2,3,4,5'
      }
    });
  }
};
