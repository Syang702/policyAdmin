import request from '@/utils/request'
export function vehicleTypeList() {
  return request({
    url: 'admin/Vehiclepipe/vehicleTypeList',
    method: 'get'
  })
}

export function vehicleType(data) {
  return request({
    url: 'admin/Vehiclepipe/vehicleType',
    method: 'post',
    data
})
}

export function vehicleTypeDel(data) {
  return request({
    url: 'admin/Vehiclepipe/vehicleTypeDel',
    method: 'post',
    data
  })
}
// 车辆
export function vehicleList(params) {
    return request({
      url: 'admin/Vehiclepipe/vehicleList',
      method: 'get',
      params
    })
  }
  
  export function vehicleAdd(data) {
    return request({
      url: 'admin/Vehiclepipe/vehicle',
      method: 'post',
      data
  })
  }
  
  export function vehicleDel(params) {
    return request({
      url: 'admin/Vehiclepipe/vehicleDel',
      method: 'get',
      params
    })
  }
  

  export function isOrder() {
    return request({
      url: 'che/remindOrders',
      method: 'get'
    })
  }
  