<template>
  <div id="screenfull">
    <i class="el-icon-full-screen" @click="click" />
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull'
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

const sf = screenfull
export default defineComponent({
  setup() {
    const state = reactive({
      isFullscreen: false,
      click: () => {
        if (!sf.isEnabled) {
          ElMessage({
            message: '浏览器不支持全屏',
            type: 'warning'
          })
          return false
        }
        sf.toggle()
      }
    })
    const change = () => {
      if (sf.isEnabled) {
        state.isFullscreen = sf.isFullscreen
      }
    }
    onMounted(() => {
      if (sf.isEnabled) {
        sf.on('change', change)
      }
    })

    onBeforeUnmount(() => {
      if (sf.isEnabled) {
        sf.off('change', change)
      }
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
