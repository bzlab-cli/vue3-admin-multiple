/*
 * @Description: 权限指令
 * @Author: jrucker
 * @Date: 2020-12-28 10:39:21
 * @LastEditors: jrucker
 * @LastEditTime: 2022/07/15 15:13:17
 * @Example: v-permission="布尔值"
 */

import { Directive } from 'vue'
import { isBoolean } from '@/utils'

function removeNode(el) {
  el.parentNode && el.parentNode.removeChild(el)
}

function checkPermission(el, value) {
  if (!isBoolean(value)) throw new Error(`Need perms like v-permission="true|false"`)
  if (!value) {
    return removeNode(el)
  }
}

export const permissionAll: Directive = {
  mounted(el, binding) {
    const { value } = binding
    checkPermission(el, value)
  },
  updated(el, binding) {
    const { value } = binding
    checkPermission(el, value)
  }
}
