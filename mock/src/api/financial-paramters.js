import request from '@/utils/request'

// 财务列表 2:转账，3=兑换，4=汇款
export function fianceList(type) {
  return request({
    url: 'admin/finance/financeList',
    method: 'get',
    params: {
      type
    }
  })
}

// 转账：删除
export function deleteOneFinancialSettings(data) {
  return request({
    url: 'admin/finance/deleteFinance',
    method: 'post',
    data
  })
}

// 转账：添加  
export function addNewFinanceial(data) {
  return request({
    url: 'admin/finance/addFinance',
    method: 'post',
    data
  })
}

// 转账:获取当前编辑行数据
export function editFinancialColData(params) {
  return request({
    url: 'admin/finance/editFinance',
    method: 'get',
    params
  })
}
// 提现+汇款：币种列表
export function currencysList() {
  return request({
    url: 'admin/currency/currencyList',
    method: 'get',
  })
}
// 转账：编辑提交
export function updateNewFinanceial(data) {
  return request({
    url: 'admin/finance/editFinance',
    method: 'post',
    data
  })
}

// ------------后台充值+扣费设置-----------------------
export function backstageFeeEdit(type) {
  return request({
    url: 'admin/finance/feeList',
    method: 'get',
    params: {
      type, // 设置类型： 1 = 后台充值 2 = 扣费
    }
  })
}

export function choicedSubmit(data) {
  return request({
    url: 'admin/finance/editFeeCommit',
    method: 'post',
    data
  })
}
// 兑换设置
export function petsList() {
  return request({
    url: 'admin/finance/petList',
    method: 'get',
  })
}
export function petsChoicedEdit() {
  return request({
    url: 'admin/finance/convert',
    method: 'get',
  })
}

export function petschoicedSubmit(data) {
  return request({
    url: 'admin/finance/convertCommit',
    method: 'post',
    data
  })
}
