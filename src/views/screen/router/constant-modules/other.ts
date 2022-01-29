/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 11:14:55
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/25 13:13:05
 */

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/screen/index.vue'

const OtherRouter: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/screen/redirect/index.vue')
      }
    ]
  }
]

export default OtherRouter
