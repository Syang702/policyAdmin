/* 评分管理api */
import request from "@/utils/request";
//评分列表
export function scoreList(data) {
  return request({
    url: "admin/Standard/selStandard",
    method: "post",
    data
  });
}
//添加评分
export function addScore(data) {
  return request({
    url: "admin/Standard/addStandard",
    method: "post",
    data
  });
}
//删除评分
export function deleteScore(id) {
  return request({
    url: "admin/Standard/delStandard",
    method: "post",
    data: {
      id
    }
  });
}
//编辑评分
export function editScore(id) {
  return request({
    url: "admin/Standard/editStandard",
    method: "post",
    data: {
      id
    }
  });
}
//编辑评分提交
export function editSubmit(data) {
  return request({
    url: "admin/Standard/editStandardCommit",
    method: "post",
    data
  });
}
//评分标准列表,根据政策id 返回
export function declareList(policy_id) {
  return request({
    url: "admin/policy/declareList",
    method: "post",
    data: { policy_id }
  });
}
