/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 11:12:57
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/25 12:45:02
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
          icon: '#icondashboard',
          affix: true
        }
      }
    ]
  }
]

export default DashboardRouter
