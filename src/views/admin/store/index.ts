/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/26 17:14:30
 */

import { createStore } from 'vuex'
import { store as app, AppStore } from '@/views/admin/store/modules/app'
import { store as settings, SettingStore } from '@/views/admin/store/modules/settings'
import { store as permission, PermissionStore } from '@/views/admin/store/modules/permission'
import { store as user, UserStore } from '@/views/admin/store/modules/user'
import { store as tagViews, TagsStore } from '@/views/admin/store/modules/tags'

import { AppState } from '@/views/admin/store/modules/app/state'
import { SettingsState } from '@/views/admin/store/modules/settings/state'
import { PermissionState } from '@/views/admin/store/modules/permission/state'
import { UserState } from '@/views/admin/store/modules/user/state'
import { TagsViewState } from '@/views/admin/store/modules/tags/state'
export interface RootState {
  app: AppState
  settings: SettingsState
  permission: PermissionState
  user: UserState
  tagViews: TagsViewState
}

export type Store = AppStore<Pick<RootState, 'app'>> &
  SettingStore<Pick<RootState, 'settings'>> &
  PermissionStore<Pick<RootState, 'permission'>> &
  UserStore<Pick<RootState, 'user'>> &
  TagsStore<Pick<RootState, 'tagViews'>>

export const store = createStore({
  modules: {
    app,
    settings,
    permission,
    user,
    tagViews
  }
})

export function useStore(): Store {
  return store as Store
}
