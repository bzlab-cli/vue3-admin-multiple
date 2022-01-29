/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/27 19:11:31
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/views/admin/store'
import { AppState, DeviceType } from './state'
import { Mutations } from './mutations'
import { AppMutationTypes, AppActionTypes } from './types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<AppState, RootState>, 'commit'>

export interface Actions {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR]({ commit }: AugmentedActionContext, withoutAnimation: boolean): void
  [AppActionTypes.ACTION_CLOSE_SIDEBAR]({ commit }: AugmentedActionContext, withoutAnimation: boolean): void
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }: AugmentedActionContext, device: DeviceType): void
}

export const actions: ActionTree<AppState, RootState> & Actions = {
  [AppActionTypes.ACTION_TOGGLE_SIDEBAR]({ commit }, withoutAnimation: boolean) {
    commit(AppMutationTypes.TOGGLE_SIDEBAR, withoutAnimation)
  },
  [AppActionTypes.ACTION_CLOSE_SIDEBAR]({ commit }, withoutAnimation: boolean) {
    commit(AppMutationTypes.CLOSE_SIDEBAR, withoutAnimation)
  },
  [AppActionTypes.ACTION_TOGGLE_DEVICE]({ commit }, device: DeviceType) {
    commit(AppMutationTypes.TOGGLE_DEVICE, device)
  }
}
