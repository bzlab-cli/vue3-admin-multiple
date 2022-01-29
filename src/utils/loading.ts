/*
 * @Author: jrucker
 * @Description: 全局loading
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2021/11/01 16:22:56
 */

import { ElLoading } from 'element-plus'

export default function () {
  const loading = (title: string) => {
    const loadingInstance = ElLoading.service({ text: title })
    return loadingInstance
  }

  return {
    loading
  }
}
