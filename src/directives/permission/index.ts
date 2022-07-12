/*
 * @Description: 权限指令
 * @Author: jrucker
 * @Date: 2020-12-28 10:39:21
 * @LastEditors: jrucker
 * @LastEditTime: 2022/07/12 15:59:50
 */

import { useStore } from '@/views/admin/store'
import { Directive } from 'vue'
import { isArray, isString, isBoolean } from '@/utils'

function removeNode(el) {
  el.parentNode && el.parentNode.removeChild(el)
}

function checkFlag(el, flag, val) {
  const perms = useStore().state.permission.accessedCodes
  if (!flag) return removeNode(el)
  if (!perms.includes(val)) {
    removeNode(el)
  }
}

function checkPermission(el, value) {
  const perms = useStore().state.permission.accessedCodes
  if (!value) throw new Error(`Need perms like v-permission="'权限名称'"`)
  if (isArray(value)) {
    if (value.length !== 2) throw new Error(`Need perms like v-permission="[true|false, '权限名称']"`)
    const [flag, val] = value
    if (!isBoolean(flag)) throw new Error(`The first parameter must be of type boolean"`)
    if (!isString(val)) throw new Error(`The second parameter must be of type string"`)
    return checkFlag(el, flag, val)
  }

  if (isString(value)) {
    if (!perms.includes(value)) {
      return removeNode(el)
    }
  }
}

export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    checkPermission(el, value)
  },
  updated(el, binding) {
    const { value } = binding
    checkPermission(el, value)
  }
}
