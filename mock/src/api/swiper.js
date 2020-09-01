import request from '@/utils/request'
// 列表
export function swiperList() {
  return request({
    url: 'admin/banner/bannerList',
    method: 'get',
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
// export function getCurrencyEditData(id) {
//   return request({
//     url: 'admin/banner/editBanner',
//     method: 'get',
//     params: {
//       id
//     }
//   })
// }
export function addSwiperCommit(data) {
  return request({
    url: 'admin/banner/addBanner',
    method: 'post',
    data
  })
}
export function editSwiperCommit(data) {
  return request({
    url: 'admin/banner/editBannerCommit',
    method: 'post',
    data
  })
}
export function deleteOneSwiper(id) {
  return request({
    url: 'admin/banner/deleteBanner',
    method: 'post',
    data: {
      id
    }
  })
}
