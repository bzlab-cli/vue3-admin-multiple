/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/01 17:02:39
 */

import { Request } from './request'
import { ContentType } from '@/config/headers'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  headers: {
    'Content-Type': ContentType.JSON
  }
})

export default request
