/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/28 13:33:46
 */

import { ActionTree, ActionContext } from 'vuex'
import { RootState, useStore } from '@/views/admin/store'
import { UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes, UserActionTypes } from './types'
import { PermissionActionType } from '../permission/types'
import { login, userInfo } from '@/api/auth/user'
import { getMenuGrantByRoleId } from '@/api/auth/role'
import { removeToken, setToken } from '@/utils/auth'
import { resetRouter } from '@/views/admin/router'
import { ElMessage } from 'element-plus'
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>
export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { account: string; password: string }
  ): void
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<any>
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_GET_MENU]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { account: string; password: string }
  ) {
    console.log('userInfo', userInfo)

    const { account, password } = userInfo
    const res = await login({ account: account.trim(), password })
    console.log('res', res)

    if (res.retCode === 200 && res.data?.token) {
      setToken(res.data.token)
      commit(UserMutationTypes.SET_TOKEN, res.data.token)
    }
  },
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<any> {
    return new Promise(resolve => {
      removeToken()
      commit(UserMutationTypes.SET_TOKEN, '')
      commit(UserMutationTypes.SET_USER_ID, '')
      commit(UserMutationTypes.LOAD_USER_INFO, false)
      resolve('done')
    })
  },
  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    const res = await userInfo()
    if (res?.retCode === 200) {
      commit(UserMutationTypes.SET_NAME, res.data?.account || '')
      commit(UserMutationTypes.SET_AVATAR, res.data?.headUrl || '')
      commit(UserMutationTypes.SET_USER_ID, res.data?.userId || '')
      commit(UserMutationTypes.SET_ROLE_ID, res.data?.roleId || '')
      commit(UserMutationTypes.SET_ROLE_NAME, res.data?.roleName || '')
      commit(UserMutationTypes.LOAD_USER_INFO, true)
      return res
    } else {
      ElMessage.error(res.retMsg)
    }
  },
  async [UserActionTypes.ACTION_GET_MENU]({ state }: AugmentedActionContext) {
    const { data, retCode, retMsg } = await getMenuGrantByRoleId({ roleId: state.roleId })
    if (retCode !== 200) return ElMessage.error(retMsg)
    useStore().dispatch(PermissionActionType.ACTION_SET_ROUTES, data)
  },
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_USER_ID, '')
    commit(UserMutationTypes.LOAD_USER_INFO, false)
    resetRouter()
  }
}
