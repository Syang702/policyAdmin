/* 查询记录api */
import request from "@/utils/request";
//公司明细
export function enterprise(enterprise_id) {
  return request({
    url: "admin/Enterprise/Enterprise",
    method: "post",
    data: { enterprise_id }
  });
}
//搜索公司
export function selEnterprise(data) {
  return request({
    url: "admin/Enterprise/selEnterprise",
    method: "post",
    data
  });
}
//下载政策
export function policyData(id) {
  return request({
    url: "admin/Enterprise/policy_data",
    method: "post",
    data: { id }
    //responseType: 'blob',
  });
}
//下载评分
export function scoreData(id) {
  return request({
    url: "admin/Enterprise/score_data",
    method: "post",
    data: { id }
    //responseType: 'blob'
  });
}
