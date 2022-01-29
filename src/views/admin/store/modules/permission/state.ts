/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/16 17:00:50
 */

import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
  accessedCodes: string[]
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

export const state: PermissionState = {
  accessedCodes: [],
  routes: [],
  dynamicRoutes: []
}
