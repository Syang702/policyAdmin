import request from '@/utils/request'
// ------------------------------------奖金设置----------------------
export function awardsList() {
  return request({
    url: 'admin/award/awardList',
    method: 'get',
  })
}

export function awardsSwitchSubmit(data) {
  return request({
    url: 'admin/award/awardState',
    method: 'post',
    data
  })
}
//------------------- -----------------推荐奖+团队奖-----------------
export function introList() {
  return request({
    url: 'admin/award/recommendList',
    method: 'get',
  })
}

export function addIntroAwards(data) {
  return request({
    url: 'admin/award/addRecommend',
    method: 'post',
    data
  })
}
export function introAwardsSubmit(data) {
  return request({
    url: 'admin/award/editRecommendCommit',
    method: 'post',
    data
  })
}
export function deleteAwardsSubmit(id) {
  return request({
    url: 'admin/award/deleteRecommend',
    method: 'post',
    data: {
      id
    }
  })
}

export function teamList() {
  return request({
    url: 'admin/award/teamList',
    method: 'get',
  })
}
export function addteamAwards(data) {
  return request({
    url: 'admin/award/addTeam',
    method: 'post',
    data
  })
}
export function teamAwardsSubmit(data) {
  return request({
    url: 'admin/award/editTeamCommit',
    method: 'post',
    data
  })
}
export function deleteTeamAwardsSubmit(id) {
  return request({
    url: 'admin/award/deleteTeam',
    method: 'post',
    data: {
      id
    }
  })
}
// 级别列表
export function rankList() {
  return request({
    url: 'admin/rank/rankList',
    method: 'get',
  })
}
