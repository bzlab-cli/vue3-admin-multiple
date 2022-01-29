/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/28 12:51:21
 */

import { getToken } from '@/utils/auth'

export interface UserState {
  token: string
  name: string
  avatar: string
  userId: string
  roleId: string
  roleName: string
  loadUserInfo: boolean
}

export const state: UserState = {
  token: getToken() || '',
  userId: '',
  name: '',
  avatar: 'https://img2.baidu.com/it/u=3924374604,1207041510&fm=26&fmt=auto',
  roleId: '',
  roleName: '', // 岗位名称
  loadUserInfo: false // 第一次加载用户信息
}
