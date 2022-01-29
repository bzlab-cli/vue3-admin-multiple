<template>
  <div class="navbar">
    <img src="@/assets/images/home/logo.png" class="logo-img" @click="goHome" />
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { AppActionTypes } from '@/views/screen/store/modules/app/types'
import { UserActionTypes } from '@/views/screen/store/modules/user/types'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const device = computed(() => {
      return store.state.app.device.toString()
    })
    const name = computed(() => {
      return store.state.user.name
    })
    const avatar = computed(() => {
      return store.state.user.avatar
    })
    const state = reactive({
      toggleSideBar: () => {
        store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
      },
      logout: () => {
        store.dispatch(UserActionTypes.ACTION_LOGIN_OUT)
        router.push(`/login?redirect=${route.fullPath}`).catch(err => {
          console.warn(err)
        })
      }
    })

    // const img = require('@/assets/images/head_bg.jpeg')
    const img = ''
    const isHome = computed(() => {
      return store.state.settings.isHome
      // console.log(999, sessionStorage.getItem('isHome') === null)
      // if (sessionStorage.getItem('isHome') === null) {
      //   return store.state.settings.isHome
      // } else {
      //   return JSON.parse(sessionStorage.getItem('isHome'))
      // }
    })

    // console.log(7732, isHome.value)

    function goHome() {
      window.location.href = '/'
    }

    return {
      sidebar,
      device,
      name,
      avatar,
      ...toRefs(state),
      img,
      isHome,
      goHome
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 2rem /* 160/80 */;
  overflow: hidden;
  position: relative;
  // background: #151a25;
  background: rgba(21, 26, 37, 1);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .logo-img {
    position: absolute;
    top: 0.5rem /* 40/80 */;
    left: 0.5rem /* 40/80 */;

    cursor: pointer;
  }

  .navbar-title {
    width: 100%;
  }

  .title {
    width: 420px;
    height: 39px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    background-image: -webkit-linear-gradient(right, #95989d 0%, #ffffff 50%, #95989d 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
