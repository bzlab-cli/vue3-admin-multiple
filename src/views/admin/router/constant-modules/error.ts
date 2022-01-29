/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 11:10:50
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/25 11:14:38
 */

import { RouteRecordRaw } from 'vue-router'

const ErrorRouter: Array<RouteRecordRaw> = [
  {
    path: '/401',
    component: () => import('@/views/admin/error-page/401.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/admin/error-page/404.vue'),
    meta: {
      hidden: true
    }
  }
]

export default ErrorRouter
