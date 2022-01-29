/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/27 19:15:51
 */

import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '@/views/admin/store'
import { SettingsState } from './state'
import { Mutations } from './mutations'
import { SettingsMutationTypes, SettingsActionTypes } from './types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<SettingsState, RootState>, 'commit'>

export interface Actions {
  [SettingsActionTypes.ACTION_CHANGE_SETTING](
    { commit }: AugmentedActionContext,
    payload: { key: string; value: any }
  ): void
}

export const actions: ActionTree<SettingsState, RootState> & Actions = {
  [SettingsActionTypes.ACTION_CHANGE_SETTING](
    { commit }: AugmentedActionContext,
    payload: { key: string; value: any }
  ) {
    commit(SettingsMutationTypes.CHANGE_SETTING, payload)
  }
}
