// 封装 local storage 存取token ， 使登录状态持久化

const key = 'pc-key'

const setToken = (token) => {
  // token 存储到 localStorage
  return window.localStorage.setItem(key, token)
}

const getToken = () => {
  return window.localStorage.getItem(key)
}

const removeToken = () => {
  return window.localStorage.removeItem(key)
}

export {
  setToken,
  getToken,
  removeToken
}