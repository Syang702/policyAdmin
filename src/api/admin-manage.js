/* 系统管理 api */
import request from "@/utils/request";
// ----------------------------角色管理----------------------
//角色列表
export function rolesList() {
  return request({
    url: "admin/roleadmin/roleAdminList",
    method: "get"
  });
}
//添加角色
export function addNewRoles(data) {
  return request({
    url: "admin/roleadmin/addRoleAdmin",
    method: "post",
    data
  });
}
//删除角色
export function deleteOneRoles(id) {
  return request({
    url: "admin/roleadmin/deleteRoleAdmin",
    method: "post",
    data: {
      id
    }
  });
}
//编辑角色提交
export function editRolesCommit(data) {
  return request({
    url: "admin/roleadmin/editRoleAdminCommit",
    method: "post",
    data
  });
}
// 展示角色详情
export function editRole(id) {
  return request({
    url: "che/editRole",
    method: "get",
    params: { id }
  });
}
// 所有权限列表
export function authRuleList() {
  return request({
    url: "admin/authrule/authRuleList",
    method: "get"
  });
}
//已有权限
// export function defaultAuthList(role_id) {
//   return request({
//     url: "che/adminRole",
//     method: "get",
//     params: { role_id }
//   });
// }
// 编辑授权提交
export function authEditSubmit(data) {
  return request({
    url: "admin/roleadmin/empowerRoleAdminCommit",
    method: "post",
    data
  });
}

// ----------------------------管理员管理----------------------
export function getAdminList(params) {
  //管理员列表
  return request({
    url: "admin/admin/adminList",
    method: "get",
    params
  });
}
// // 角色
// export function rankList() {
//   return request({
//     url: "admin/admin/editAdmin",
//     method: "get"
//   });
// }
// 添加管理员
export function addNewUser(data) {
  return request({
    url: "admin/admin/addAdminCommit",
    method: "post",
    data
  });
}
// 删除管理员
export function delAdmin(id) {
  return request({
    url: "admin/admin/deleteAdmin",
    method: "post",
    data: {
      id
    }
  });
}
// 提交编辑
export function editUserCommit(data) {
  return request({
    url: "admin/admin/editAdminCommit",
    method: "post",
    data
  });
}

// 重置密码
export function resetBackstageUserPsd(data) {
  return request({
    url: "admin/admin/resetPassword",
    method: "post",
    data
  });
}
// 管理员详情
export function adminDetails(id) {
  return request({
    url: "admin/admin/editAdmin",
    method: "get",
    params: { id }
  });
}
// 是否禁用
// export function isStatus(data) {
//   return request({
//     url: "/che/isStatus",
//     method: "post",
//     data
//   });
// }
//------------------------------轮播图-----------------------------
//轮播图列表
export function swiperList(data) {
  return request({
    url: "admin/banner/bannerList",
    method: "get",
    params: data
  });
}
//添加轮播图
export function addSwiperCommit(params) {
  return request({
    url: "admin/banner/addBanner",
    method: "post",
    params
  });
}
//轮播图编辑提交
export function editSwiperCommit(params) {
  return request({
    url: "admin/banner/editBannerCommit",
    method: "post",
    params
  });
}
//删除轮播图
export function deleteOneSwiper(params) {
  return request({
    url: "admin/banner/deleteBanner",
    method: "post",
    params
  });
}
//上传base64
export function uploadBase(data) {
  return request({
    url: "admin/upload/baseUpload",
    method: "post",
    data
  });
}
//商品详情图上传
export function uploadProductDetail(data) {
  return request({
    url: "admin/Product/uploadProductDetail",
    method: "post",
    data
  });
}
//------------------------------客服-------------------------------
//客服列表
export function selService(data) {
  return request({
    url: "admin/Service/selService",
    method: "get",
    data
  });
}
//添加客服
export function addService(data) {
  return request({
    url: "admin/Service/addService",
    method: "post",
    data
  });
}
//删除客服
export function delService(id) {
  return request({
    url: "aadmin/Service/delService",
    method: "post",
    data: { id }
  });
}
//编辑客服
export function editService(id) {
  return request({
    url: "admin/Service/editService",
    method: "post",
    data: { id }
  });
}
//编辑客服提交
export function editServiceCommit(data) {
  return request({
    url: "admin/Service/editServiceCommit",
    method: "post",
    data
  });
}
//--------------------------- 资讯 --------------------
//资讯列表
export function getList(data) {
  return request({
    url: "admin/IndexConfig/indexConfigList",
    method: "post",
    data
  });
}
//删除
export function deleted(id) {
  return request({
    url: "admin/IndexConfig/deleteIndexConfig",
    method: "post",
    data: { id }
  });
}
//新增
export function add(data) {
  return request({
    url: "admin/indexConfig/addIndexConfig",
    method: "post",
    data
  });
}
//编辑获取信息
export function edit(id) {
  return request({
    url: "admin/indexConfig/editIndexConfig",
    method: "post",
    data: { id }
  });
}
//编辑提交
export function editSubmit(data) {
  return request({
    url: "admin/indexConfig/editIndexConfigCommit",
    method: "post",
    data
  });
}
