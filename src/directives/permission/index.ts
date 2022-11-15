/*
 * @Description: 权限指令
 * @Author: jrucker
 * @Date: 2020-12-28 10:39:21
 * @LastEditors: jrucker
 * @LastEditTime: 2022/11/15 18:17:14
 * @examples:
 * 单权限验证 v-permission="'权限名称'"
 * 单个验证 v-permission="[flag, '权限名称']"
 * 多权限验证 v-permission="[flag, ['权限名称']]"
 */

import { useStore } from '@/views/admin/store'
import { Directive } from 'vue'
import { isArray, isString } from '@/utils'

function removeNode(el) {
  el.parentNode && el.parentNode.removeChild(el)
}

function checkFlag(type, el, val) {
  const perms = useStore().state.permission.accessedCodes
  if (type === 'string' && !perms.includes(val)) {
    return removeNode(el)
  }
  if (type === 'boolean' && !perms.some(perm => val.includes(perm))) {
    return removeNode(el)
  }
}

function checkPermission(el, value) {
  if (!value) throw new Error(`need perms like v-permission="'权限名称'"`)
  if (isString(value)) {
    return checkFlag('string', el, value)
  }
  if (isArray(value)) {
    const [flag, val] = value
    if (flag) return
    if (isArray(val)) {
      return checkFlag('boolean', el, val)
    } else {
      return checkFlag('string', el, val)
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
