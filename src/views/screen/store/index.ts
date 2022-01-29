/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/27 19:15:51
 */

import { createStore } from 'vuex'
import { store as app, AppStore } from '@/views/screen/store/modules/app'
import { store as permission, PermissionStore } from '@/views/screen/store/modules/permission'
import { store as user, UserStore } from '@/views/screen/store/modules/user'

import { AppState } from '@/views/screen/store/modules/app/state'
import { PermissionState } from '@/views/screen/store/modules/permission/state'
import { UserState } from '@/views/screen/store/modules/user/state'
export interface RootState {
  app: AppState
  permission: PermissionState
  user: UserState
}

export type Store = AppStore<Pick<RootState, 'app'>> &
  PermissionStore<Pick<RootState, 'permission'>> &
  UserStore<Pick<RootState, 'user'>>

export const store = createStore({
  modules: {
    app,
    permission,
    user
  }
})

export function useStore(): Store {
  return store as Store
}
