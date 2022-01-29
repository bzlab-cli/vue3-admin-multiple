<template>
  <div class="err-page">
    <el-button icon="el-icon-arrow-left" class="back-btn" @click="back">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>您没有权限访问该页面</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/dashboard">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" class="some-gif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import errGif from '@/assets/images/error/401.gif'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const data = reactive({
      errGif: errGif + '?' + +new Date(),
      back() {
        if (route.query.noGoBack) {
          router.push({ path: '/dashboard' }).catch(err => {
            console.warn(err)
          })
        } else {
          router.go(-1)
        }
      }
    })

    return { ...toRefs(data) }
  }
})
</script>

<style lang="scss" scoped>
.err-page {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .some-gif {
    margin: 0 auto;
    display: block;
  }

  .some-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
