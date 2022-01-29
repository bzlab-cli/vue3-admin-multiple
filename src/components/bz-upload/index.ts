/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/11/25 00:01:20
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/26 10:33:39
 */

import { App } from 'vue'
import BzUpload from './index.vue'

BzUpload.install = (app: App): void => {
  app.component(BzUpload.name, BzUpload)
}

export default BzUpload
