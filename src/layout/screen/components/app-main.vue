<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const cachedViews = computed(() => {
      return []
    })
    const key = () => {
      return route.path
    }
    return {
      cachedViews,
      key
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 2rem);
  width: 100%;
  position: relative;
  overflow: hidden;
  height: calc(100vh - 160px);
  background-color: rgba(21, 26, 37, 1);
}

.fixed-header + .app-main {
  padding: 65px 15px 15px 15px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding: 99px 15px 15px 15px;
  }
}
</style>
