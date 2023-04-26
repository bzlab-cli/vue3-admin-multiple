/*
 * @Description:
 * @Author: jrucker
 * @Date: 2021/10/21 14:13:07
 * @LastEditors: jrucker
 * @LastEditTime: 2023/04/26 18:16:25
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const constantFiles = require.context('./constant-modules', true, /\.ts$/)
let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach(key => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

const asyncFiles = require.context('./async-modules', true, /\.ts$/)
let permissionModules: Array<RouteRecordRaw> = []
asyncFiles.keys().forEach(key => {
  if (key === './index.ts') return
  permissionModules = permissionModules.concat(asyncFiles(key).default)
})

export const constantRoutes: Array<RouteRecordRaw> = [...constantModules]

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...permissionModules,
  { path: '/:pathMatch(.*)', redirect: '/404', meta: { hidden: true } }
]
export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher
}

export default router
