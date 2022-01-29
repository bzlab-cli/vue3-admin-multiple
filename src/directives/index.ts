/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/26 11:52:04
 */

import { permission } from './permission'
import inputFloat from './validate/input-float'
import inputInt from './validate/input-int'

export default {
  permission: permission,
  'input-int': inputInt,
  'input-float': inputFloat
}
