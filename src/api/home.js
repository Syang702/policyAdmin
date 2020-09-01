/* 首页 api */
import request from "@/utils/request";
//角色列表
export function homeList() {
  return request({
    url: "admin/Enterprise/index",
    method: "get"
  });
}
