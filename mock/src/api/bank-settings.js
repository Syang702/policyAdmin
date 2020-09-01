import request from '@/utils/request'
// 列表
export function bankList() {
  return request({
    url: 'admin/bank/bankList',
    method: 'get',
  })
}
// 银行设置删除
export function deleteBankCol(id) {
  return request({
    url: 'admin/bank/deleteBank',
    method: 'get',
    params: {
      id
    }
  })
}
// 编辑当前行数据
export function getBankEditColData(id) {
  return request({
    url: 'admin/bank/editbank',
    method: 'get',
    params: {
      id
    }
  })
}
// 银行设置：添加提交 
export function addBankCommit(params) {
  return request({
    url: 'admin/bank/addBank',
    method: 'get',
    params
  })
}
// 银行设置：编辑提交
export function updateBankCommit(data) {
  return request({
    url: 'admin/bank/editBank',
    method: 'post',
    data
  })
}
