import request from '@/utils/request'

// --------------------------------系统公告-----------------------------
export function noticeList(params) {
  return request({
    url: 'admin/notice/noticeList',
    method: 'get',
    params
  })
}
export function noticeDelete(id) {
  return request({
    url: 'admin/notice/deleteNotice',
    method: 'post',
    data: {
      id
    }
  })
}
export function noticeEdit(id) {
  return request({
    url: 'admin/notice/editNotice',
    method: 'get',
    params: {
      id
    }
  })
}
export function noticeEditSubmit(data) {
  return request({
    url: 'admin/notice/editNoticeCommit',
    method: 'post',
    data
  })
}
export function noticeAddSubmit(data) {
  return request({
    url: 'admin/notice/addNotice',
    method: 'post',
    data
  })
}

export function noticePrev(id) {
  return request({
    url: 'admin/notice/editNotice',
    method: 'get',
    params: {
      id
    }
  })
}
// 站内信
export function sendLetterList(params) {
  return request({
    url: 'admin/mail/sendList',
    method: 'get',
    params
  })
}
export function sendLletterDelete(id) {
  return request({
    url: 'admin/mail/deleteSend',
    method: 'post',
    data: {
      id
    }
  })
}
export function receiptReceiptList(params) {
  return request({
    url: 'admin/mail/receiveList',
    method: 'get',
    params
  })
}
export function receiptReceiptDelete(id) {
  return request({
    url: 'admin/mail/deleteReceive',
    method: 'post',
    data: {
      id
    }
  })
}
export function replySendSubmit(data) {
  return request({
    url: 'admin/mail/receive',
    method: 'post',
    data
  })
}
