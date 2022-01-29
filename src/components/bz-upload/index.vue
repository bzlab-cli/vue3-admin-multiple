<!--
 * @Author: jrucker
 * @Description: 
 * @Date: 2021/11/26 09:54:36
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/20 17:22:18
-->

<script lang="ts">
import { defineComponent, h } from 'vue'
import BzUpload from '@bz/bz-upload'
import '@bz/bz-upload/lib/bz-upload.css'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { UserActionTypes } from '@/views/admin/store/modules/user/types'
import { getToken } from '@/utils/auth'
import { getEnv } from '@/config/settings'

function NOOP() {}
export default defineComponent({
  name: 'BzUpload',
  components: {
    BzUpload
  },
  props: {
    isBim: {
      type: Boolean,
      default: false
    },
    aliyun: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: process.env.VUE_APP_FTP_API + '/ftp/uploadFile?path=nzf-dev/$md5'
    },
    download: {
      type: String,
      default: process.env.VUE_APP_FTP_STATIC_API
    },
    headers: {
      type: Object,
      default: () => ({
        token: getToken()
      })
    },
    data: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'file'
    },
    drag: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'select'
    },
    beforeUpload: {
      type: Function,
      default: NOOP
    },
    beforeRemove: {
      type: Function,
      default: NOOP
    },
    onRemove: {
      type: Function,
      default: NOOP
    },
    onSuccess: {
      type: Function,
      default: NOOP
    },
    onProgress: {
      type: Function,
      default: NOOP
    },
    onError: {
      type: Function,
      default: null
    },
    onExceed: {
      type: Function,
      default: () => NOOP
    },
    onChange: {
      type: Function,
      default: () => NOOP
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    limit: {
      type: Number,
      default: null
    }
  },
  render() {
    const onError = res => {
      const store = useStore()
      if (res.status === 500) {
        ElMessage.error('登录已失效，请重新登录')
        store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined).then(() => {
          location.reload()
        })
      }
      if (res.status === 502) {
        ElMessage.error('服务器响应失败，请重试')
      }
    }
    const uploadData = {
      aliyun: this.aliyun,
      type: this.type,
      drag: this.drag,
      action: this.action,
      download: this.download,
      multiple: this.multiple,
      'before-upload': this.beforeUpload,
      showFileList: this.showFileList,
      headers: this.headers,
      name: this.name,
      data: this.data,
      accept: this.accept,
      fileList: this.fileList,
      autoUpload: this.autoUpload,
      disabled: this.disabled,
      limit: this.limit,
      'on-exceed': this.onExceed,
      'on-change': this.onChange,
      'on-progress': this.onProgress,
      'on-success': this.onSuccess,
      'on-error': this.onError ? this.onError : onError,
      'on-remove': this.onRemove,
      ref: 'bzUploadRef'
    }

    if (!uploadData.aliyun) {
      let env = getEnv(process.env.VUE_APP_ENV)
      if (this.isBim) {
        uploadData.action = process.env.VUE_APP_FTP_API + `/ftp/uploadFile?path=${env}/bim_temp/$md5`
      } else {
        uploadData.action = process.env.VUE_APP_FTP_API + `/ftp/uploadFile?path=${env}/file/$md5`
      }
    }

    const trigger = this.$slots.trigger || this.$slots.default
    const uploadComponent = h(BzUpload, uploadData, {
      default: () => trigger?.()
    })
    return h('div', [
      this.$slots.trigger ? [uploadComponent, (this.$slots as any).default()] : uploadComponent,
      this.$slots.tip?.()
    ])
  }
})
</script>
