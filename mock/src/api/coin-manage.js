import request from '@/utils/request'

export function getCurrencyList() {
  return request({
    url: 'admin/currency/currencyList',
    method: 'get',
  })
}

// export function editCurrency(id) {
//   return request({
//     url: 'admin/currency/editCurrency',
//     method: 'get',
//     params: {
//       id
//     }
//   })
// }

export function updateCurrency(data) {
  return request({
    url: 'admin/currency/editCurrencyCommit',
    method: 'post',
    data
  })
}
