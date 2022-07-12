/*
 * @Author: jrucker
 * @Description: 请求加载拦截器
 * @example: async withLoading(api)(params)
 * @Date: 2022/07/06 14:40:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/07/12 14:46:12
 */

import { ElLoading } from 'element-plus'

const defaultOptions = {
  lock: true,
  text: '正在加载...',
  background: 'rgba(0, 0, 0, 0.1)'
}

export const withLoading = (fn, options = {}) => {
  let loading
  const showLoading = options => {
    loading = ElLoading.service(options)
  }

  const hideLoading = () => {
    if (loading) {
      loading.close()
    }
  }
  const props = Object.assign(defaultOptions, options)
  const newFn = (...args) => {
    try {
      showLoading(props)
      const result = fn(...args)
      const isPromise = result instanceof Promise
      if (!isPromise) {
        hideLoading()
        return result
      }
      return result
        .then(res => {
          hideLoading()
          return res
        })
        .catch(err => {
          hideLoading()
          throw err
        })
    } catch (err) {
      hideLoading()
      throw err
    }
  }
  return newFn
}
