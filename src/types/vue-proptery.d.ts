/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/01 10:31:22
 */

import { ElMessage } from 'element-plus'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: ElMessage
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]
  }
}
