/*
 * @Description:
 * @Author: jrucker
 * @Date: 2021/11/08 11:32:52
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/27 18:47:49
 */

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/admin/index.vue'

const permissionRouter: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '系统管理',
      icon: '#iconquanxian',
      alwaysShow: true
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/admin/system/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          icon: '#iconquanxian'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/system/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: '#iconquanxian'
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/admin/system/menu/index.vue'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          icon: '#iconquanxian'
        }
      },
      {
        path: 'org',
        component: () => import('@/views/admin/system/org/index.vue'),
        name: 'org',
        meta: {
          title: '组织管理',
          icon: '#iconquanxian'
        }
      }
    ]
  }
]

export default permissionRouter
