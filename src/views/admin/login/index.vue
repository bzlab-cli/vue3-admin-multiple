<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ login.title }}
        </h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          ref="userNameRef"
          v-model="loginForm.account"
          :placeholder="login.account"
          name="account"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="login.password"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" class="submit" @click.prevent="handleLogin">
        {{ login.logIn }}
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, ref, nextTick, toRefs } from 'vue'
import { useRoute, LocationQuery, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { UserActionTypes } from '@/views/admin/store/modules/user/types'

const validateAccount = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (value.length < 6) {
    return callback(new Error('密码最少6位'))
  }
  callback()
}

export default defineComponent({
  setup() {
    const userNameRef = ref(null)
    const passwordRef = ref(null)
    const loginFormRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      login: {
        title: '管理平台',
        logIn: '登录',
        account: '请输入手机号',
        password: '请输入密码'
      },
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: '',
      otherQuery: {}
    })

    const methods = reactive({
      showPwd: () => {
        if (state.passwordType === 'password') {
          state.passwordType = ''
        } else {
          state.passwordType = 'password'
        }
        nextTick(() => {
          ;(passwordRef.value as any).focus()
        })
      },
      handleLogin: () => {
        ;(loginFormRef.value as any).validate(async (valid: boolean) => {
          if (valid) {
            state.loading = true
            try {
              await store.dispatch(UserActionTypes.ACTION_LOGIN, state.loginForm)
            } catch (error) {
              state.loading = false
            }
            router
              .push({
                path: state.redirect || '/',
                query: state.otherQuery
              })
              .catch(err => {
                console.warn(err)
              })
            state.loading = false
          } else {
            return false
          }
        })
      }
    })

    function getOtherQuery(query: LocationQuery) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {} as LocationQuery)
    }

    watch(
      () => route.query,
      (query: any) => {
        if (query) {
          state.redirect = query.redirect?.toString() ?? ''
          state.otherQuery = getOtherQuery(query)
        }
      }
    )

    onMounted(() => {
      if (state.loginForm.account === '') {
        ;(userNameRef.value as any).focus()
      } else if (state.loginForm.password === '') {
        ;(passwordRef.value as any).focus()
      }
    })

    return {
      userNameRef,
      passwordRef,
      loginFormRef,
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      height: 47px;
      background: transparent;
      border: 0;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;
      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $loginBg inset !important;
        -webkit-text-fill-color: #ffffff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;
  video {
    position: absolute;

    /* Vertical and Horizontal center */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .submit {
    width: 100%;
    margin-bottom: 30px;
  }
  .tips {
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #ffffff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
