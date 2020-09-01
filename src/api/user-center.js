import request from '@/utils/request'
// 级别
export function rankList(params) {
  return request({
    url: 'admin/Usercenter/rankList',
    method: 'get',
    params
  })
}

export function rankEdit(data) {
  return request({
    url: 'admin/Usercenter/rankEdit',
    method: 'post',
    data
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
// 币种列表
export function currencyList() {
  return request({
    url: 'admin/member/currencyList',
    method: 'get'
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
export function memberDetailSubmit(data) {
  return request({
    url: 'admin/user/editUser',
    method: 'post',
    data
  })
}

// --------------会员管理->充值提交--------------
export function rechargeMoneySubmit(data) {
  return request({
    url: 'che/userRecharge',
    method: 'post',
    data
  })
}


// --------------会员管理->扣费--------------
export function feeDeductionMoneySubmit(data) {
  return request({
    url: 'che/userFee',
    method: 'post',
    data
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
// 审核列表
export function vehicleAudit(params) {
  return request({
    url: 'che/cardApplyList',
    method: 'get',
    params
  })
}
export function cardDetail(id) {
  return request({
    url: 'che/cardDetail',
    method: 'get',
    params:{id}
  })
}
// 审核
export function cardPass(id) {
  return request({
    url: 'che/cardPass',
    method: 'post',
    data:{id}
  })
}

export function cardNopass(data) {
  return request({
    url: 'che/cardNopass',
    method: 'post',
    data
  })
}
// 充值审核
export function investList(params) {
  return request({
    url: 'admin/Usercenter/investList',
    method: 'get',
    params
  })
}
// 列表
export function userList(params) {
  return request({
    url: 'che/memberList',
    method: 'get',
    params
  })
}

// 詳情
export function memberDetail(id) {
  return request({
    url: 'che/memberDetail',
    method: 'get',
    params:{id}
  })
}
//冻结
export function changeStatus(data) {
  return request({
    url: 'che/userStatus',
    method: 'post',
    data
  })
}
// 会员详情
export function getUserInfo(id) {
  return request({
    url: 'admin/User/getUserInfo',
    method: 'get',
    params:{id}
  })
}
//上传收款二维码
export function uploadUserCode(image) {
  return request({
    url: 'admin/User/uploadUserCode',
    method: 'post',
    data:{image}
  })
}
// 上传身份证
export function uploadUserIdCard(image) {
  return request({
    url: 'admin/User/uploadUserIdCard',
    method: 'post',
    data:{image}
  })
}
// 信息提交
export function userEidtCommit(data) {
  return request({
    url: 'che/memberUpdate',
    method: 'post',
    data
  })
}
//提现审核
export function withdrawList(params) {
  return request({
    url: 'che/withdrawList',
    method: 'get',
    params
  })
}
export function withdrawDetail(id) {
  return request({
    url: 'che/withdrawDetail',
    method: 'get',
    params:{id}
  })
}
export function passWithdraw(id) {
  return request({
    url: 'che/passWithdraw',
    method: 'post',
    data:{id}
  })
}
export function nopassWithdraw(data) {
  return request({
    url: 'che/nopassWithdraw',
    method: 'post',
    data
  })
}