// 先把所有的工具函数导出的模块在这里导入
// 然后再通过 index.js 统一导出
import { http } from './http'
import {
  setToken,
  getToken,
  removeToken
} from './token'

import { history } from './history'

export {
  http,
  setToken,
  getToken,
  removeToken,
  history
}

// 调用的时候， 直接这么写就好 ：
//  import {http} from '@/utils'