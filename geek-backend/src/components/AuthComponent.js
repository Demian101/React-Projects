// 路由鉴权： 比如说你没登录 , 就想访问  /articles  , 是不允许的, 得先给我登录去
// 1. 判断token是否存在
// 2. 如果存在 直接正常渲染
// 3. 如果不存在 重定向到登录路由

// 高阶组件: 把一个组件当成另外一个组件的参数传入
// 然后通过一定的判断 返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthComponent ({ children }) {  // 每个组件都有默认的 children 属性 ，如 <Com> xx </Com> , children 就是 xx
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>  // 正常的子组件渲染
  } else {
    return <Navigate to="/login" replace />  // 没有 Token ，Navigate 负责重定向
  }
}

// <AuthComponent> <Layout/> </AuthComponent>
// 登录状态（有 Token）： 返回  <><Layout/></>
// 非登录状态： 返回 <Navigate to="/login" replace />

export {
  AuthComponent
}