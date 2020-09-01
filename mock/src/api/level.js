import request from '@/utils/request'
// 级别列表
export function levelList() {
  return request({
    url: 'admin/Rank/rankConfigList',
    method: 'get',
  })
}
// 级别规则删除
export function deleteOneLevelRules(id) {
  return request({
    url: 'admin/Rank/delRankConfig',
    method: 'get',
    params: {
      id
    }
  })
}
// 级别规则获取当前编辑行
export function editCurrentLevelCol(id) {
  return request({
    url: 'admin/Rank/editRankConfigs',
    method: 'get',
    params: {
      id
    }
  })
}
// 级别规则编辑提交
export function editLevelSubmit(params) {
  return request({
    url: 'admin/Rank/editRankConfig',
    method: 'get',
    params
  })
}
// 级别规则添加提交
export function addLevelSubmit(params) {
  return request({
    url: 'admin/Rank/addRankConfig',
    method: 'get',
    params
  })
}
// 会员级别
export function rankList() {
  return request({
    url: 'admin/Rank/RankList',
    method: 'get',
  })
}
// 前台角色列表
export function roleList() {
  return request({
    url: 'admin/roleUser/roleUserList',
    method: 'get',
  })
}
