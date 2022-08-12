/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 11:12:57
 * @LastEditors: jrucker
 * @LastEditTime: 2022/08/12 15:04:02
 */

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/screen/index.vue'

const DashboardRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/screen/view/dashboard/index.vue'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'el-icon-menu',
          affix: true
        }
      }
    ]
  }
]

export default DashboardRouter
