<template>
  <div class="menu-container">
    <el-dialog :title="dialogTitle" v-model="isShowDialog" width="769px" @close="onCancel">
      <el-form ref="formRef" :model="ruleForm" :rules="rules" size="small" label-width="80px">
        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="ruleForm.menuType">
                <el-radio-button :label="1">目录</el-radio-button>
                <el-radio-button :label="2">菜单</el-radio-button>
                <el-radio-button :label="3">按钮</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="ruleForm.menuName" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
            <el-form-item label="上级菜单">
              <tree-select
                v-model="ruleForm.parentId"
                :list="treeSelectList"
                @tree-select="handleTreeSelect"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
            <el-form-item label="菜单排序" prop="menuSort">
              <el-input v-model="ruleForm.menuSort" placeholder="菜单排序" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            class="mb10"
            v-if="ruleForm.menuType === 1 || ruleForm.menuType === 2"
          >
            <el-form-item label="菜单图标">
              <icon-selector placeholder="请输入菜单图标" v-model="ruleForm.menuIcon" />
            </el-form-item>
          </el-col>

          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            class="mb10"
            v-if="ruleForm.menuType === 1 || ruleForm.menuType === 2"
          >
            <el-form-item label="组件名称" prop="menuRoute">
              <el-input v-model="ruleForm.menuRoute" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            class="mb10"
            v-if="ruleForm.menuType === 1 || ruleForm.menuType === 2"
          >
            <el-form-item label="组件" prop="menuComponents">
              <el-input v-model="ruleForm.menuComponents" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            class="mb10"
            v-if="ruleForm.menuType === 1 || ruleForm.menuType === 2"
          >
            <el-form-item label="组件路径" prop="menuUrl">
              <el-input v-model="ruleForm.menuUrl" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
            <el-form-item label="是否显示" prop="hiddenFlag" style="width: 100%">
              <el-select v-model="ruleForm.hiddenFlag" placeholder="请选择">
                <el-option label="显示" :value="1"></el-option>
                <el-option label="隐藏" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb10">
            <el-form-item label="状态" prop="status" style="width: 100%">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option label="启用" :value="0"></el-option>
                <el-option label="禁用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
            class="mb10"
            v-if="ruleForm.menuType === 2 || ruleForm.menuType === 3"
          >
            <el-form-item label="权限标识">
              <el-input v-model="ruleForm.menuCode" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="small">取消</el-button>
          <el-button type="primary" @click="onSubmit" size="small">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import iconSelector from '@/components/icon-selector/index.vue'
import treeSelect from '@/components/tree-select/index.vue'
import { addMenu, updateMenu } from '@/api/auth/menu'
import { ElMessage } from 'element-plus'
import { filter, forEachTree } from '@/utils'

interface ISubmit {
  id?: number | null
  createDefaultButton: boolean
  menuCode: string
  menuComponents: string
  menuIcon: string
  menuName: string
  menuSort: number
  menuType: number
  menuUrl: string
  parentId: number
  status: number
  remarks: string
}

export default {
  name: 'add-menu',
  components: { iconSelector, treeSelect },
  setup() {
    const formRef = ref(null) as any
    const treeSelectList = ref([])
    const state = reactive({
      dialogTitle: '新增菜单',
      isShowDialog: false,
      dialogType: 'add',
      id: null,
      callback: function () {},
      ruleForm: {
        menuType: 1,
        menuName: '',
        parentId: 0,
        menuCode: '',
        menuSort: 0,
        menuIcon: '',
        menuRoute: '',
        menuUrl: '',
        hiddenFlag: 1, // 默认显示
        status: 0,
        menuComponents: '',
        remarks: ''
      },
      rules: {
        menuType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        menuSort: [{ required: true, message: '请输入菜单排序', trigger: 'blur' }],
        menuRoute: [{ required: true, message: '请输入路由名称', trigger: 'blur' }],
        menuUrl: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
        menuComponents: [{ required: true, message: '请输入组件地址', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    })

    const setMenuTreeList = data => {
      const filterMenu = filter(data, item => {
        return item.menuType !== 3
      })
      let childrenName = 'childTreeList'
      forEachTree(filterMenu, item => {
        if (item[childrenName]) {
          item.label = item.menuName
          item.value = item.id
          item.children = item[childrenName]
        }
      })
      console.log('filterMenu', filterMenu)
      ;(treeSelectList.value as any) = filterMenu
    }

    // 打开弹窗
    const openDialog = (row, callback) => {
      console.log('openDialog', row, row.treeSelectList)
      state.isShowDialog = true
      state.dialogType = row.dialogType
      state.dialogTitle = row.dialogTitle
      setMenuTreeList(row.tableData)

      state.id = row.id
      state.callback = callback

      if (row.id) {
        state.ruleForm.menuType = row.menuType
        state.ruleForm.menuName = row.menuName
        state.ruleForm.parentId = row.parentId
        state.ruleForm.menuCode = row.menuCode
        state.ruleForm.menuSort = row.menuSort
        state.ruleForm.menuIcon = row.menuIcon
        state.ruleForm.menuRoute = row.menuRoute
        state.ruleForm.menuUrl = row.menuUrl
        state.ruleForm.hiddenFlag = row.hiddenFlag
        state.ruleForm.status = row.status
        state.ruleForm.menuComponents = row.menuComponents
      }
    }

    // 关闭弹窗
    const closeDialog = () => {
      state.isShowDialog = false
    }

    const handleTreeSelect = data => {
      state.ruleForm.parentId = data.id
      console.log('handleTreeSelect', data)
    }

    // 取消
    const onCancel = () => {
      closeDialog()
      initForm()
    }
    // 新增
    const onSubmit = async () => {
      console.log(state.ruleForm)
      formRef.value.validate(async valid => {
        if (valid) {
          let params = {
            createDefaultButton: false,
            menuType: state.ruleForm.menuType,
            menuName: state.ruleForm.menuName,
            parentId: state.ruleForm.parentId,
            menuCode: state.ruleForm.menuCode,
            menuSort: state.ruleForm.menuSort,
            menuIcon: state.ruleForm.menuIcon,
            menuRoute: state.ruleForm.menuRoute,
            menuUrl: state.ruleForm.menuUrl,
            hiddenFlag: state.ruleForm.hiddenFlag,
            status: state.ruleForm.status,
            menuComponents: state.ruleForm.menuComponents,
            remarks: state.ruleForm.remarks
          } as ISubmit

          if (state.dialogType === 'update') {
            params.id = state.id
          }
          let { retCode, retMsg } = state.dialogType === 'add' ? await addMenu(params) : await updateMenu(params)
          if (retCode !== 200) return ElMessage.warning(retMsg)
          state.callback()
          closeDialog() // 关闭弹窗
        }
      })
    }
    const initForm = () => {
      formRef.value.resetFields()
      state.ruleForm.menuType = 1
      state.ruleForm.menuName = ''
      state.ruleForm.parentId = 0
      state.ruleForm.menuCode = ''
      state.ruleForm.menuSort = 0
      state.ruleForm.menuIcon = ''
      state.ruleForm.menuRoute = ''
      state.ruleForm.menuUrl = ''
      state.ruleForm.hiddenFlag = 1
      state.ruleForm.status = 0
      state.ruleForm.menuComponents = ''
      state.ruleForm.remarks = ''
    }
    return {
      formRef,
      treeSelectList,
      openDialog,
      closeDialog,
      onCancel,
      onSubmit,
      handleTreeSelect,
      ...toRefs(state)
    }
  }
}
</script>
