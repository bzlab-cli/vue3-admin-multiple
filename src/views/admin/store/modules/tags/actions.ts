/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/08/12 12:15:59
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/views/admin/store'
import { TagsViewState, TagView } from './state'
import { Mutations } from './mutations'
import { TagsMutationTypes, TagsActionTypes } from './types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<TagsViewState, RootState>, 'commit'>

export interface Actions {
  [TagsActionTypes.ACTION_ADD_CACHED_VIEW]({ commit }: AugmentedActionContext, view: string[]): void
  [TagsActionTypes.ACTION_DEL_CACHED_VIEW]({ commit }: AugmentedActionContext, view: TagView): void
}

export const actions: ActionTree<TagsViewState, RootState> & Actions = {
  async [TagsActionTypes.ACTION_ADD_CACHED_VIEW]({ commit }, views: string[]) {
    commit(TagsMutationTypes.ADD_CACHED_VIEW, views)
  },
  [TagsActionTypes.ACTION_DEL_CACHED_VIEW]({ commit }, view: TagView) {
    commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  }
}
