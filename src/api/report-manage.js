/* 报表管理api */
import request from "@/utils/request";
//报表列表
export function reportList(data) {
  return request({
    url: "admin/Score/selScore",
    method: "post",
    data
  });
}
//添加报表
export function addReport(data) {
  return request({
    url: "admin/Score/addScore",
    method: "post",
    data
  });
}
//删除报表
export function deleteReport(id) {
  return request({
    url: "admin/Score/delScore",
    method: "post",
    data: {
      id
    }
  });
}
//编辑报表
export function editReport(id) {
  return request({
    url: "admin/Score/editScore",
    method: "post",
    data: {
      id
    }
  });
}
//编辑报表提交
export function editSubmit(data) {
  return request({
    url: "admin/Score/editScoreCommit",
    method: "post",
    data
  });
}
