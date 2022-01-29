/*
 * @Description:
 * @Author: jrucker
 * @Date: 2020-12-29 09:12:24
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/12 17:00:12
 */

export interface LoginModel {
  competenceList?: Array<string>
  headUrl: string
  token: string
  roleId: string
  userName: string
  account: number
  password: string
  userId: string
  orgId: number
}
