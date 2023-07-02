import { Routes, Route } from 'react-router-dom' // unstable_HistoryRouter as HistoryRouter,
import { lazy, Suspense } from 'react'
// import { history } from './utils/history'

const LayoutPage = lazy(() => import('./pages/LayoutPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const NFTMintPage = lazy(() => import('./pages/NFTMintPage'))

export default function App() {
  return (
    // 路由配置
    // <HistoryRouter history={history}>   {/* 使用 HistoryRouter 进行组件外跳转 */}
    <div className="App">
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', marginTop: 200 }} >
            loading...
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<LayoutPage />} >
            <Route path='connect-us' element={<HomePage />} />
            <Route path='mint' element={<NFTMintPage />} />
            <Route path='about' element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div >
  )
};
