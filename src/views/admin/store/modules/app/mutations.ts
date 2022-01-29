/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/01 11:27:34
 */

import { MutationTree } from 'vuex'
import { AppState, DeviceType } from './state'
import { setSidebarStatus } from '@/utils/auth'
import { AppMutationTypes } from './types'

export type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.CLOSE_SIDEBAR](state: S, withoutAnimation: boolean): void
  [AppMutationTypes.TOGGLE_DEVICE](state: S, device: DeviceType): void
}

export const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = withoutAnimation
    if (state.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  },
  [AppMutationTypes.CLOSE_SIDEBAR](state: AppState, withoutAnimation: boolean) {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  },
  [AppMutationTypes.TOGGLE_DEVICE](state: AppState, device: DeviceType) {
    state.device = device
  }
}
