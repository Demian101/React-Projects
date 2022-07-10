// login module
import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken } from '@/utils'
class LoginStore {
  token = getToken() || ''  // 取得到就用 getToken() ，取不到就用空值 
  constructor() {
    makeAutoObservable(this)   // 响应式
  }
  getToken = async ({ mobile, code }) => {
    // 调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    // 存入token
    this.token = res.data.token
    // 存入 localStorage， 持久化登录状态
    setToken(this.token)
  }
  // 退出登录
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore