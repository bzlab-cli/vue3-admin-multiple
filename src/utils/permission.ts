/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2025/01/06 10:04:01
 */
import { ElMessageBox } from 'element-plus'
/**
 * 加载组件
 * @param {*} view
 * @returns
 */
export const loadView = view => {
  return () => import(`@/views/${view}`)
}

/**
 * 过滤显示菜单路由
 * @param {*} routers
 * @param {*} isRewrite
 * @returns
 */
export const filterAsyncRouter = (routers, layout) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(item => {
    item.path = item.menuUrl
    if (item.menuComponents === 'Layout') {
      item.redirect = 'noredirect'
    }

    item.meta = {
      title: item.menuName,
      icon: item.menuIcon,
      hidden: item.hiddenFlag === 0
    }

    if (item.menuType === 1) {
      item.meta.alwaysShow = true
    }

    if (item.menuComponents) {
      if (item.menuComponents === 'Layout') {
        item.component = layout
      } else {
        item.name = item.menuRoute
        item.component = loadView(item.menuComponents)
      }
    }

    if (item.childTreeList && item.childTreeList.length) {
      item.children = filterAsyncRouter(item.childTreeList, layout)
    }

    filterProps(item)
    return true
  })
}

/**
 * 过滤不需要的属性
 * @param {*} item
 */
function filterProps(item) {
  const filterPropsList = [
    'childTreeList',
    'id',
    'menuSort',
    'createUser',
    'menuComponents',
    'menuIcon',
    'menuName',
    'menuRoute',
    'menuSource',
    'menuUrl',
    'parentId',
    'remarks',
    'createTime',
    'updateTime',
    'updateUser'
  ]
  filterPropsList.map(name => {
    delete item[name]
  })
}

/**
 * @description 监听系统更新
 */
export function routeListener() {
  fetch(`/version.json?t=${Date.now()}`)
    .then(res => res.json())
    .then(res => {
      try {
        const data = res || {},
          lastVersion = window.localStorage.getItem('buildVersion')
        if (lastVersion == null) return window.localStorage.setItem('buildVersion', data.version)
        if (data.version === lastVersion) return
        window.localStorage.setItem('buildVersion', data.version)
        ElMessageBox.confirm('系统已更新，请刷新页面后访问！', '提示', {
          confirmButtonText: '确认',
          showCancelButton: false,
          closeOnClickModal: false,
          showClose: false,
          type: 'warning'
        }).then(() => {
          location.reload()
        })
      } catch (e) {
        console.error(e)
      }
    })
}
