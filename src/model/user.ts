/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/12/02 14:33:04
 */

export interface UserInfoModel {
  id: number
  account: string
  password: string
  userName: string
  headUrl: string
  userId: string
  roleId: string
  roleName: string
  roles: string[]
  orgId: number
  list: []
  total: number
  professional: number
}
