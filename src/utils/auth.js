import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuthIds(leftNavList) {
  let authIds = [];
  leftNavList.forEach(item => {
    authIds.push(item.id);
    if (item.lower.length > 0) {
      item.lower.forEach(innerItem => {
        authIds.push(innerItem.id);
      })
    }
  })

  return authIds;
}
