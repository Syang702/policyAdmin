import request from '@/utils/request'
// ---------------------会员级别列表---------------
export function userList(params) {
  return request({
    url: 'admin/user/userList',
    method: 'get',
    params
  })
}
// -----------------------会员级别------------------------
export function memberLevelList() {
  return request({
    url: 'admin/rank/rankList',
    method: 'get',
  })
}
export function editNewLevelSubmit(data) {
  return request({
    url: 'admin/rank/editRankCommit',
    method: 'post',
    data
  })
}
export function upgradeLevelSubmit(data) {
  return request({
    url: 'admin/rank/upRankCommit',
    method: 'post',
    data
  })
}
// ---------------------充值审核--------------
export function rechargeList(params) {
  return request({
    url: 'admin/trading/remittanceRecordList',
    method: 'get',
    params
  })
}
export function rechargePassStatus(id) {
  return request({
    url: 'admin/trading/remittancePass',
    method: 'post',
    data: {
      id
    }
  })
}
export function rechargeRejectStatus(data) {
  return request({
    url: 'admin/trading/remittanceNoPass',
    method: 'post',
    data
  })
}

// 失焦触发推荐信息

export function blurRegInfo(uuid) {
  return request({
    url: 'admin/member/userInfo',
    method: 'get',
    params: {
      uuid
    }
  })
}
export function regCommit(data) {
  return request({
    url: 'admin/member/registerCommit',
    method: 'post',
    data
  })
}

// 协议
export function originalProtocol(type) {
  return request({
    url: 'admin/member/treatyDetail',
    method: 'get',
    params: {
      type
    }
  })
}
export function regProtocolCommit(data) {
  return request({
    url: 'admin/member/treatyCommit',
    method: 'post',
    data
  })
}

// 会员管理详情
export function memberDetail(id) {
  return request({
    url: 'admin/user/editUser',
    method: 'get',
    params: {
      id
    }
  })
}
export function memberDetailSubmit(data) {
  return request({
    url: 'admin/user/editUser',
    method: 'post',
    data
  })
}

// --------------会员管理->冻结用户--------------
export function freezeUserSubmit(data) {
  return request({
    url: 'admin/user/updateStatus',
    method: 'post',
    data
  })
}

// --------------会员管理->充值提交--------------
export function rechargeConfig(id) {
  return request({
    url: 'admin/user/invest',
    method: 'get',
    params: {
      id
    }
  })
}
export function rechargeMoneySubmit(data) {
  return request({
    url: 'admin/user/invest',
    method: 'post',
    data
  })
}


// --------------会员管理->扣费--------------
export function feeConfig(id) {
  return request({
    url: 'admin/user/deduction',
    method: 'get',
    params: {
      id
    }
  })
}

export function feeDeductionMoneySubmit(data) {
  return request({
    url: 'admin/user/deduction',
    method: 'post',
    data
  })
}
// 删除会员

export function deleteOneSubmit(id) {
  return request({
    url: 'admin/user/deleteUser',
    method: 'post',
    data: {
      id
    }
  })
}
// --------------会员重置密码--------------
export function resetPassword(data) {
  return request({
    url: 'admin/user/resetPassword',
    method: 'post',
    data
  })
}

export function resetPayPassword(data) {
  return request({
    url: 'admin/user/resetPayPassword',
    method: 'post',
    data
  })
}

//宠物列表
export function petsList() {
  return request({
    url: 'admin/finance/petList',
    method: 'get',
  })
}
export function sendPetSubmit(data) {
  return request({
    url: 'admin/user/present',
    method: 'post',
    data
  })
}








// 编辑提交
export function updateForm(params) {
  return request({
    url: 'admin/formcenter/updateForm',
    method: 'post',
    data: params
  })
}
export function formcenterEdit(params) {
  return request({
    url: 'admin/Formcenter/edit',
    method: 'post',
    data: params
  })
}

export function rankList(params) {
  return request({
    url: 'admin/Rank/RankList',
    method: 'get',
    params
  })
}
export function reg(params) {
  return request({
    url: 'admin/member/reg',
    method: 'get',
    params
  })
}

export function delUser(params) {
  return request({
    url: 'admin/formcenter/delUser',
    method: 'post',
    data: params
  })
}
