/* 登录api */
import request from "@/utils/request";
export function login(data) {
  //登录
  return request({
    url: "admin/login/login",
    method: "post",
    data
  });
}
export function getInfo() {
  //登录权限
  return request({
    url: "admin/authrule/authRuleList",
    method: "get"
  });
}

export function logout() {
  //退出
  return request({
    url: "admin/login/loginOut",
    method: "get"
  });
}

export function countData() {
  return request({
    url: "che/index",
    method: "get"
  });
}
