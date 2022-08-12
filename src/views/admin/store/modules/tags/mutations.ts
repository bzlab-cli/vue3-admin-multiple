/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/25 19:09:06
 */

import { MutationTree } from 'vuex'
import { TagsViewState, TagView } from './state'
import { TagsMutationTypes } from './types'

export type Mutations<S = TagsViewState> = {
  [TagsMutationTypes.ADD_CACHED_VIEW](state: S, view: string[]): void
  [TagsMutationTypes.DEL_CACHED_VIEW](state: S, view: TagView): void
}

export const mutations: MutationTree<TagsViewState> & Mutations = {
  [TagsMutationTypes.ADD_CACHED_VIEW](state: TagsViewState, views: string[]) {
    state.cachedViews = views
  },
  [TagsMutationTypes.DEL_CACHED_VIEW](state: TagsViewState, view: TagView) {
    if (!view) return
    const index = state.cachedViews.indexOf(view?.toString())
    index > -1 && state.cachedViews.splice(index, 1)
  }
}
