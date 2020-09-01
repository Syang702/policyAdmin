/* 地区  政策  行业 部门  报表 api */
import request from "@/utils/request";
// 地区列表
export function areaList(data) {
  return request({
    url: "admin/Industry/regionList",
    method: "get",
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
//所有部门
export function departList(data) {
  return request({
    url: "admin/Department/selDepartment",
    method: "post",
    data: {
      page: "",
      pagesize: "",
      department_name: "",
      start_time: "",
      end_time: "",
      industry_id: ""
    }
  });
}
//所有政策
export function policyList(data) {
  return request({
    url: "admin/policy/selPolicy",
    method: "post",
    data: {
      page: "",
      pagesize: "",
      department_name: "",
      start_time: "",
      end_time: "",
      name: ""
    }
  });
}
//所有报表
export function reportList(data) {
  return request({
    url: "admin/Score/selScore",
    method: "post",
    data: {
      page: "",
      pagesize: "",
      score_name: "",
      start_time: "",
      end_time: ""
    }
  });
}
