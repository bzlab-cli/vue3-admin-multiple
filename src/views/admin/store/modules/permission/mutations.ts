/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/16 17:02:38
 */

import { MutationTree } from 'vuex'
import { PermissionState } from './state'
import { PermissionMutationType } from './types'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/views/admin/router'

export type Mutations<S = PermissionState> = {
  [PermissionMutationType.SET_ROUTES](state: S, routes: RouteRecordRaw[]): void
  [PermissionMutationType.SET_ACCESS_CODES](state: S, payload: string[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationType.SET_ROUTES](state: PermissionState, routes: RouteRecordRaw[]) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  },
  [PermissionMutationType.SET_ACCESS_CODES](state: PermissionState, payload: string[]) {
    state.accessedCodes = payload
  }
}
