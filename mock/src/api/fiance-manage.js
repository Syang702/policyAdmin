import request from '@/utils/request'

// ------------------------------------财务管理--------------
// 流水
export function billRunning(params) {
  return request({
    url: 'admin/trading/billList',
    method: 'get',
    params
  })
}
// 奖金明细
export function awardRecond(params) {
  return request({
    url: 'admin/trading/awardRecord',
    method: 'get',
    params
  })
}
// 财务统计
export function financialStatistics() {
  return request({
    url: 'admin/trading/moneyCensus',
    method: 'get',
  })
}
// 充值记录
export function rechargeRecond(params) {
  return request({
    url: 'admin/trading/investRecord',
    method: 'get',
    params
  })
}
// 扣费记录
export function deductionRecond(params) {
  return request({
    url: 'admin/trading/deductionRecord',
    method: 'get',
    params
  })
}
// 转账记录
export function transferRecond(params) {
  return request({
    url: 'admin/trading/transferRecord',
    method: 'get',
    params
  })
}