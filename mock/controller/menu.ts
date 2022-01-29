/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/29 15:59:12
 */

import { prefix, get } from '../decorator/request'
import { menuList } from '../data/menu'

@prefix('/business-web')
export default class User {
  @get('/menu/getMenuList')
  getMenuList() {
    return menuList
  }

}
