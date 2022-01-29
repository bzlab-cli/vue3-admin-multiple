/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/29 16:02:29
 */

import { prefix, get } from '../decorator/request'
import { getOrgList } from '../data/org'

@prefix('/business-web')
export default class User {
  @get('/org/getOrgList')
  async getOrgList() {
    return getOrgList
  }

  @get('/org/getOrgSelect2')
  async getOrgSelect2() {
    return [
      { id: 1001, parentId: 0, orgName: '华东区', orgLevel: 1 },
      { id: 1003, parentId: 0, orgName: '江南大区', orgLevel: 1 }
    ]
  }
}
