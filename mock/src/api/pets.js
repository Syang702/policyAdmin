import request from '@/utils/request'
// 宠物列表
export function petsList(params) {
  return request({
    url: 'admin/Pet/petList',
    method: 'get',
    params
  })
}
export function petsCreate(params) {
  return request({
    url: 'admin/Pet/addNewPet',
    method: 'post',
    params
  })
}
export function uploadBase(image) {
  return request({
    url: 'admin/upload/baseUpload',
    method: 'post',
    data: {
      image
    }
  })
}
// 预约列表
export function petsPrevList(data) {
  return request({
    url: 'admin/Pet/appointList',
    method: 'post',
    data
  })
}

// 转让列表
export function petsTransferList(params) {
  return request({
    url: 'admin/Pet/dogList',
    method: 'get',
    params
  })
}
// 交易列表
export function petsMakeoverList(params) {
  return request({
    url: 'admin/Pet/tradeList',
    method: 'get',
    params
  })
}
export function detailMakeover(id) {
  return request({
    url: 'admin/Pet/orderInfo',
    method: 'get',
    params: {
      id
    }
  })
}
export function passcomplain(id) {
  return request({
    url: 'admin/Pet/approve',
    method: 'post',
    data: {
      id
    }
  })
}
export function refusecomplain(id) {
  return request({
    url: 'admin/Pet/deny',
    method: 'post',
    data: {
      id
    }
  })
}
// 赠送列表
export function petsSendList(params) {
  return request({
    url: 'admin/Pet/sendList',
    method: 'get',
    params
  })
}
export function deleteSendSubmit(id) {
  return request({
    url: 'admin/Pet/deny',
    method: 'post',
    data: {
      id
    }
  })
}
