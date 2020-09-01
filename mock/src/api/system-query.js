import request from '@/utils/request'
// 类型：1=银行卡,2=支付宝，3=微信
export function receiptList(type) {
  return request({
    url: 'admin/gathering/gatheringList',
    method: 'get',
    params: {
      type
    }
  })
}
export function receiptAddSubmit(data) {
  return request({
    url: 'admin/gathering/addGathering',
    method: 'post',
    data
  })
}

export function editFinancialColData(id) {
  return request({
    url: 'admin/gathering/editGathering',
    method: 'get',
    params: {
      id
    }
  })
}
// 
export function receiptEditSubmit(data) {
  return request({
    url: 'admin/gathering/editGatheringCommit',
    method: 'post',
    data
  })
}
export function deleteReceiptSubmit(id) {
  return request({
    url: 'admin/gathering/deleteGathering',
    method: 'post',
    data: {
      id
    }
  })
}
export function uploadFile(image) {
  return request({
    url: 'admin/Upload/fileUpload',
    method: 'post',
    data: image
  })
}
