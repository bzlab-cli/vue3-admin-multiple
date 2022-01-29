<template>
  <div class="sidebar-logo-container" :class="[collapse ? 'collapse' : 'notitle']">
    <transition name="sidebarLogoFade">
      <div v-if="false" key="collapse" class="sidebar-logo-link" to="/">
        <img src="favicon.ico" class="sidebar-logo" />
      </div>
      <div v-else key="expand" @click="goHome" class="sidebar-logo-link" to="/">
        <img class="sidebar-logo" :src="logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Settings } from '@/config/settings'
import logo from '@/assets/images/home/logo.png'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const title = Settings.title
    function goHome() {
      window.location.href = '/'
    }
    return {
      title,
      logo,
      goHome
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 12px;
    }
  }
  &.notitle {
    .sidebar-title {
      display: none;
    }
    & .sidebar-logo {
      height: 60%;
    }
  }
}
</style>
