/* 行业管理api */
import request from "@/utils/request";

//资料列表
export function dataList(data) {
  return request({
    url: "admin/Information/selInformation",
    method: "post",
    data
  });
}
//添加资料
export function addData(data) {
  return request({
    url: "admin/Information/addInformation",
    method: "post",
    data
  });
}
//删除资料
export function deleteData(id) {
  return request({
    url: "admin/Information/delInformation",
    method: "post",
    data: {
      id
    }
  });
}
//编辑资料
export function editData(id) {
  return request({
    url: "admin/Information/editInformation",
    method: "post",
    data: {
      id
    }
  });
}
//编辑资料提交
export function editDataSubmit(data) {
  return request({
    url: "admin/Information/editInformationCommit",
    method: "post",
    data
  });
}