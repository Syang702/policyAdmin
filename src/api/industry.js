/* 行业管理api */
import request from "@/utils/request";

//行业列表
export function industryList(data) {
  return request({
    url: "admin/Industry/selIndustry",
    method: "post",
    data
  });
}
//添加行业
export function addIndustry(data) {
  return request({
    url: "admin/Industry/addIndustry",
    method: "post",
    data
  });
}
//删除行业
export function deleteIndustry(id) {
  return request({
    url: "admin/Industry/delIndustry",
    method: "post",
    data: {
      id
    }
  });
}
//编辑行业
export function editIndustry(id) {
  return request({
    url: "admin/Industry/editIndustry",
    method: "get",
    data: {
      id
    }
  });
}
//编辑行业提交
export function editSubmit(data) {
  return request({
    url: "admin/Industry/editIndustryCommit",
    method: "post",
    data
  });
}
//导入行业
export function excelIndustry(data) {
    return request({
      url: "admin/Policy/excelIndustry",
      method: "post",
      data
    });
  }
  