import request from '@/utils/request'

// 角色管理
export function rolesList() {
  return request({
    url: 'admin/roleadmin/roleAdminList',
    method: 'get',
  })
}

export function addNewRoles(data) {
  return request({
    url: 'admin/roleadmin/addRoleAdmin',
    method: 'post',
    data
  })
}
export function deleteOneRoles(id) {
  return request({
    url: 'admin/roleadmin/deleteRoleAdmin',
    method: 'post',
    data: {
      id
    }
  })
}
export function editRolesCommit(data) {
  return request({
    url: 'admin/roleadmin/editRoleAdminCommit',
    method: 'post',
    data
  })
}

// 添加权限数据列表
export function authMuneList() {
  return request({
    url: 'admin/authrule/authRuleList',
    method: 'get',
  })
}
export function defaultAuthList(id) {
  return request({
    url: 'admin/roleadmin/empowerRoleAdmin',
    method: 'get',
    params: {
      id
    }
  })
}
// 授权提交
export function authEditSubmit(data) {
  return request({
    url: 'admin/roleadmin/empowerRoleAdmin',
    method: 'post',
    data
  })
}

// ----------------------------管理员管理----------------------
export function getAdminList(params) {
  return request({
    url: 'admin/admin/adminList',
    method: 'get',
    params
  })
}
// 角色列表

export function rankList() {
  return request({
    url: 'admin/roleadmin/roleAdminList',
    method: 'get',
  })
}
// 添加新管理员
export function addNewUser(data) {
  return request({
    url: 'admin/admin/addAdminCommit',
    method: 'post',
    data
  })
}
// 删除管理员
export function delAdmin(id) {
  return request({
    url: 'admin/admin/deleteAdmin',
    method: 'post',
    data: {
      id
    }
  })
}
// 编辑获取当前点击行数据
export function currencyEditColData(id) {
  return request({
    url: 'admin/admin/editAdmin',
    method: 'get',
    params: {
      id
    }
  })
}

// 提交编辑
export function editUserCommit(data) {
  return request({
    url: 'admin/admin/editAdmin',
    method: 'post',
    data
  })
}

// 重置密码
export function resetBackstageUserPsd(data) {
  return request({
    url: 'admin/admin/resetPassword',
    method: 'post',
    data
  })
}
// -----------------------------图谱-------------------------------
// 获取团队图谱数据
export function getTeamMap(member, start_level, endLevel) {
  return request({
    url: 'admin/collection/listGroup',
    method: 'get',
    params: {
      member,
      start_level,
      endLevel
    }
  })
}
// 全局数据初始化
export function resetData() {
  return request({
    url: 'admin/clear/clear',
    method: 'get',
  })
}