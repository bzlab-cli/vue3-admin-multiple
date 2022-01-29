/*
 * @Description:
 * @Author: jrucker
 * @Date: 2020-12-25 15:03:52
 * @LastEditors: jrucker
 * @LastEditTime: 2021/12/13 18:37:47
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/views/screen/store'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType, PermissionActionType } from './types'
import { asyncRoutes } from '@/views/screen/router'
import { RouteRecordRaw } from 'vue-router'
import { filter } from '@/utils'
import { filterAsyncRouter } from '@/utils/permission'
import Layout from '@/layout/screen/index.vue'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      }
    })
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface Actions {
  [PermissionActionType.ACTION_SET_ROUTES]({ commit }: AugmentedActionContext, routes: any[]): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  [PermissionActionType.ACTION_SET_ROUTES]({ commit }: AugmentedActionContext, routes: any[]) {
    const accessedCodes: any = []
    filter(routes, item => {
      if (item.menuType === 3 && item.grantFlag) {
        accessedCodes.push(item.menuCode)
      }
      return true
    })

    const filterRoutes = filter(routes, item => {
      return item.menuType !== 3 && item.grantFlag
    })
    const accessedRoutes = filterAsyncRouter(filterRoutes, Layout)
    accessedRoutes.push({ path: '/:pathMatch(.*)', redirect: '/404', meta: { hidden: true } })

    console.log('accessedRoutes', accessedRoutes)
    console.log('routes', routes)
    console.log('asyncRoutes', asyncRoutes)

    commit(PermissionMutationType.SET_ACCESS_CODES, accessedCodes)
    commit(PermissionMutationType.SET_ROUTES, asyncRoutes)
  }
}
