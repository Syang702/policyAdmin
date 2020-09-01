/* 行业管理api */
import request from "@/utils/request";

//部门列表
export function departList(data) {
  return request({
    url: "admin/Department/selDepartment",
    method: "post",
    data
  });
}
//添加部门
export function addDepart(data) {
  return request({
    url: "admin/Department/addDepartment",
    method: "post",
    data
  });
}
//删除部门
export function deleteDepart(id) {
  return request({
    url: "admin/Department/delDepartment",
    method: "post",
    data: {
      id
    }
  });
}
//编辑行业
export function editDepart(id) {
  return request({
    url: "admin/Department/editDepartment",
    method: "get",
    data: {
      id
    }
  });
}
//编辑部门提交
export function editSubmit(data) {
  return request({
    url: "admin/Department/editDepartmentCommit",
    method: "post",
    data
  });
}
//所有行业
export function industryList(data) {
  return request({
    url: "admin/Department/industryList",
    method: "get",
    data
  });
}
