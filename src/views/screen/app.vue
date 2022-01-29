<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import '@/utils/flexible'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup() {
    const store = useStore()
    ;(window as any).store = store
    const isRouterAlive = computed(() => {
      return store.state.app.isRouterAlive
    })

    return {
      locale: zhCn,
      isRouterAlive
    }
  }
})
</script>
<style lang="scss">
.page-content {
  box-sizing: border-box;
  height: 100%;
}
</style>
