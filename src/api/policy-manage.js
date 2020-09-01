/* 行业管理api */
import request from "@/utils/request";
//政策列表
export function policyList(data) {
  return request({
    url: "admin/policy/selPolicy",
    method: "post",
    data
  });
}
//添加部门
export function addPolicy(data) {
  return request({
    url: "admin/policy/addPolicy",
    method: "post",
    data
  });
}
//删除政策
export function delPolicy(id) {
  return request({
    url: "admin/policy/delPolicy",
    method: "post",
    data: {
      id
    }
  });
}
//编辑政策
export function editPolicy(id) {
  return request({
    url: "admin/policy/editPolicy",
    method: "post",
    data: {
      id
    }
  });
}
//编辑政策提交
export function editSubmit(data) {
  return request({
    url: "admin/policy/editPolicyCommit",
    method: "post",
    data
  });
}
//编辑添加页面申报条件
export function conditionsList(data) {
  return request({
    url: "admin/policy/conditionsList",
    method: "get",
    data
  });
}
//编辑页面返回的申报标准列表
export function declareList(policy_id) {
  return request({
    url: "admin/policy/declareList",
    method: "post",
    data: { policy_id }
  });
}
//编辑页面返回的奖励制度列表
export function rewardList(policy_id) {
  return request({
    url: "admin/policy/rewardList",
    method: "post",
    data: { policy_id }
  });
}
//导入政策
export function excelPolicy(data) {
  return request({
    url: "admin/Policy/excelPolicy",
    method: "post",
    data
  });
}
