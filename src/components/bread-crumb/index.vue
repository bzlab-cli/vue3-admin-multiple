<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs, watch } from 'vue'
import { useRoute, RouteLocationMatched, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'

export default defineComponent({
  setup() {
    const router = useRouter()
    const currentRoute = useRoute()
    const pathCompile = (path: string) => {
      const { params } = currentRoute
      const toPath = compile(path)
      return toPath(params)
    }

    const state = reactive({
      breadcrumbs: [] as Array<RouteLocationMatched>,
      getBreadcrumb: () => {
        const matched = currentRoute.matched.filter(item => item.meta && item.meta.title)
        state.breadcrumbs = matched.filter(item => {
          return item.meta && item.meta.title && item.meta.breadcrumb !== false
        })
      },
      handleLink(item: any) {
        const { redirect, path } = item
        if (redirect) {
          router.push(redirect).catch(err => {
            console.warn(err)
          })
          return
        }
        router.push(pathCompile(path)).catch(err => {
          console.warn(err)
        })
      }
    })

    watch(
      () => currentRoute.path,
      path => {
        if (path.startsWith('/redirect/')) {
          return
        }
        state.getBreadcrumb()
      }
    )

    onBeforeMount(() => {
      state.getBreadcrumb()
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
