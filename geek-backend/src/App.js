import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import { history } from './utils'

import './App.css'
import { AuthComponent } from '@/components/AuthComponent'
import { lazy, Suspense } from 'react'

// 按需导入组件
// @ 在 craco.config.js 里被 resolve 为 path+'src' 了，所以仍能找到
const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/pages/Layout'))
const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

function App () {
  return (
    // 路由配置
    <HistoryRouter history={history}>   {/* 使用 HistoryRouter 进行组件外跳转 */}
      <div className="App">
        <Suspense
          fallback={
            <div style={{ textAlign: 'center', marginTop: 200 }} >
              loading...
            </div>
          }
        >
          <Routes>  {/*  这里是路由出口， 路由出口？？？ */}
            {/* 创建路由path和组件对应关系 */}
            {/* Layout需要鉴权处理的 */}
            {/* 这里的Layout 一定不能写死 要根据是否登录进行判断 */}
            <Route path='/' element={     
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }>
              <Route index element={<Home />}></Route>
              <Route path='article' element={<Article />}></Route>
              <Route path='publish' element={<Publish />}></Route>
            </Route>
            {/* 这个不需要 */}
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
