/*
 * @Description: 权限
 * @Author: jrucker
 * @Date: 2020-12-26 13:45:52
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/27 19:47:04
 */

import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex'
import { RootState } from '@/views/screen/store'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import { PermissionState } from './state'
import { state } from './state'

export type PermissionStore<S = PermissionState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<PermissionState, RootState> = {
  state,
  mutations,
  actions
}
