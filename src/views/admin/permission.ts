/*
 * @Author: jrucker
 * @Description: 权限
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/29 16:24:56
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import { RouteLocationNormalized } from 'vue-router'
import { useStore } from './store'
import { UserActionTypes } from './store/modules/user/types'
import { ElMessage } from 'element-plus'
import { whiteList, whiteNameList } from '@/config/whitelist'
import { routeListener } from '@/utils/permission'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  const store = useStore()

  if (whiteList.indexOf(to.path) !== -1 || whiteNameList.indexOf(to.name as string) !== -1) {
    next()
  } else {
    routeListener()
    if (store.state.user.token) {
      if (!store.state.user.loadUserInfo) {
        try {
          await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
          await store.dispatch(UserActionTypes.ACTION_GET_MENU, undefined)
          store.state.permission.dynamicRoutes.forEach((route: any) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (err) {
          console.error(err)
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined).then(() => {
            ElMessage.error('登录已失效，请重新登录')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          })
        }
      } else {
        next()
      }
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
  document.title = to.meta.title as string
})
