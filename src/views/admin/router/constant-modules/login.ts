/*
 * @Description: 登录路由
 * @Author: jrucker
 * @Date: 2021-10-21 18:04:55
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/26 13:39:45
 */
import { RouteRecordRaw } from 'vue-router'
const LoginRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/admin/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  }
]
export default LoginRouter
