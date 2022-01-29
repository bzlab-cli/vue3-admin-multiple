<template>
  <div class="role-container">
    <el-dialog :title="dialogTitle" v-model="isShowDialog" width="500px" @close="onCancel">
      <el-form :model="ruleForm" :rules="rules" ref="formRef" size="small" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="组织">
          <tree-select
            v-model="ruleForm.orgId"
            :list="treeSelectList"
            @tree-select="handleTreeSelect"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio-button :label="0">启用</el-radio-button>
            <el-radio-button :label="1">禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="备注">
          <el-input v-model="ruleForm.remarks" placeholder="请输入" clearable></el-input>
        </el-form-item> -->
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
import { reactive, toRefs, ref } from 'vue'
import { addRole, updateRole } from '@/api/auth/role'
import { getOrgSelect2 } from '@/api/auth/org'
import { ElMessage } from 'element-plus'
import treeSelect from '@/components/tree-select/index.vue'
import { forEachTree } from '@/utils'

interface ISubmit {
  id?: string
  orgId: number | string
  status: number
  remarks: string
  roleName: string
}

export default {
  name: 'add-role',
  components: {
    treeSelect
  },
  setup() {
    const formRef = ref(null) as any
    const treeSelectList = ref([])
    const state = reactive({
      isShowDialog: false,
      dialogTitle: '新增角色',
      dialogType: 'add',
      callback: function () {},
      id: '',
      ruleForm: {
        orgId: 0,
        roleName: '',
        status: 0,
        remarks: ''
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    })

    // 打开弹窗
    const openDialog = async (row, callback) => {
      console.log('openDialog', row)
      state.isShowDialog = true
      state.dialogType = row.dialogType
      state.dialogTitle = row.dialogTitle
      state.id = row.id
      state.callback = callback
      await fetchOrgList()

      if (row.id) {
        state.ruleForm.status = row.status
        state.ruleForm.orgId = row.orgId
        state.ruleForm.roleName = row.roleName
        state.ruleForm.remarks = row.remarks
      }
    }

    const setOrgTreeList = data => {
      forEachTree(data, item => {
        item.label = item.orgName
        item.value = item.id
      })
      ;(treeSelectList.value as any) = data
    }

    const fetchOrgList = async () => {
      let { data, retCode, retMsg } = await getOrgSelect2({
        orgLevel: 1,
        parentId: 0
      })
      if (retCode !== 200) return ElMessage.warning(retMsg)
      setOrgTreeList(data || [])
    }

    // 关闭弹窗
    const closeDialog = () => {
      state.isShowDialog = false
    }

    // 取消
    const onCancel = () => {
      closeDialog()
      initForm()
    }

    const onSubmit = async () => {
      console.log(state.ruleForm)
      formRef.value.validate(async valid => {
        if (valid) {
          let params = {
            orgId: state.ruleForm.orgId,
            status: state.ruleForm.status,
            remarks: state.ruleForm.remarks,
            roleName: state.ruleForm.roleName
          } as ISubmit

          if (state.dialogType === 'update') {
            params.id = state.id
          }
          let { retCode, retMsg } = state.dialogType === 'add' ? await addRole(params) : await updateRole(params)
          if (retCode !== 200) return ElMessage.warning(retMsg)
          state.callback()
          closeDialog()
        }
      })
    }

    const initForm = () => {
      formRef.value.resetFields()
      state.ruleForm.orgId = 0
      state.ruleForm.roleName = ''
      state.ruleForm.status = 0
      state.ruleForm.remarks = ''
    }

    return {
      formRef,
      treeSelectList,
      openDialog,
      closeDialog,
      onCancel,
      onSubmit,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-container {
}
</style>
