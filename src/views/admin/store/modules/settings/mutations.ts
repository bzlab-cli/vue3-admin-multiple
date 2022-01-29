/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/25 19:06:21
 */

import { MutationTree } from 'vuex'
import { SettingsState } from './state'
import { SettingsMutationTypes } from './types'

export type Mutations<S = SettingsState> = {
  [SettingsMutationTypes.CHANGE_SETTING](state: S, payload: { key: string; value: any }): void
}

export const mutations: MutationTree<SettingsState> & Mutations = {
  [SettingsMutationTypes.CHANGE_SETTING](state: SettingsState, payload: { key: string; value: any }) {
    const { key, value } = payload
    switch (key) {
      case 'theme':
        state.theme = value
        break
      case 'fixedHeader':
        state.fixedHeader = value
        break
      case 'showSidebarLogo':
        state.showSidebarLogo = value
        break
      case 'showTagsView':
        state.showTagsView = value
        break
      case 'sidebarTextTheme':
        state.sidebarTextTheme = value
        break
      default:
        break
    }
  }
}
