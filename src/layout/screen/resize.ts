/*
 * @Description: 根据大小变化重新布局
 * @Author: jrucker
 * @Date: 2020-12-17 15:37:56
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/27 18:52:22
 */

import { useStore } from 'vuex'
import { AppActionTypes } from '@/views/screen/store/modules/app/types'
import { DeviceType } from '@/views/screen/store/modules/app/state'
import { computed } from 'vue'

const WIDTH = 992

export default function () {
  const store = useStore()
  const device = computed(() => {
    return store.state.app.device
  })

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      store.dispatch(AppActionTypes.ACTION_TOGGLE_DEVICE, DeviceType.Mobile)
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      store.dispatch(AppActionTypes.ACTION_TOGGLE_DEVICE, isMobile() ? DeviceType.Mobile : DeviceType.Desktop)
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize
  }
}
