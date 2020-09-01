/* 公司管理api */
import request from "@/utils/request";
//公司列表
export function companyList(data) {
  return request({
    url: "admin/Enterprise/enterpriseList",
    method: "post",
    data
  });
}
//公司详情
export function companyDetail(enterprise_id) {
  return request({
    url: "admin/Enterprise/enterpriseDetail",
    method: "post",
    data: {
      enterprise_id
    }
  });
}
