<template>
  <div class="org-container">
    <el-dialog :title="dialogTitle" v-model="isShowDialog" width="500px" @close="onCancel">
      <el-form :model="ruleForm" :rules="rules" ref="formRef" size="small" label-width="80px">
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="ruleForm.orgName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级组织">
          <tree-select
            v-model="ruleForm.parentId"
            :list="treeSelectList"
            @tree-select="handleTreeSelect"
            style="width: 100%"
          />
        </el-form-item> -->
        <el-form-item label="排序" prop="orgSort">
          <el-input v-model="ruleForm.orgSort" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio-button :label="0">启用</el-radio-button>
            <el-radio-button :label="1">禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ruleForm.remarks" placeholder="请输入" clearable></el-input>
        </el-form-item>
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
// import treeSelect from '@/components/tree-select/index.vue'
import { addOrg, updateOrg, getOrgSelect2 } from '@/api/auth/org'
import { ElMessage } from 'element-plus'
import { forEachTree } from '@/utils'

export default {
  name: 'add-org',
  components: {
    // treeSelect
  },
  setup() {
    const treeSelectList = ref([])
    const formRef = ref(null) as any
    const state = reactive({
      isShowDialog: false,
      dialogTitle: '新增组织',
      dialogType: 'add',
      id: null,
      callback: function () {},
      ruleForm: {
        parentId: 0,
        orgLevel: 1, // 1、一级 2、二级...
        orgName: '',
        status: 0,
        orgSort: '',
        remarks: ''
      },
      rules: {
        orgName: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        orgSort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    })

    // 打开弹窗
    const openDialog = (row, callback) => {
      console.log('openDialog', row)
      state.isShowDialog = true
      state.dialogType = row.dialogType
      state.dialogTitle = row.dialogTitle
      state.id = row.id
      state.callback = callback

      if (row.id) {
        state.ruleForm.parentId = row.parentId
        state.ruleForm.orgLevel = row.orgLevel
        state.ruleForm.orgName = row.orgName
        state.ruleForm.status = row.status
        state.ruleForm.orgSort = row.orgSort
        state.ruleForm.remarks = row.remarks
      }
      fetchOrgList()
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

    const handleTreeSelect = data => {
      state.ruleForm.parentId = data.id
    }

    // 取消
    const onCancel = () => {
      closeDialog()
      initForm()
    }

    // 新增
    const onSubmit = () => {
      console.log(state.ruleForm)

      formRef.value.validate(async valid => {
        if (valid) {
          console.log('valid', valid)
          let params = {
            parentId: state.ruleForm.parentId,
            orgLevel: state.ruleForm.orgLevel,
            orgName: state.ruleForm.orgName,
            status: state.ruleForm.status,
            orgSort: state.ruleForm.orgSort,
            remarks: state.ruleForm.remarks
          } as any

          if (state.dialogType === 'update') {
            params.id = state.id
          }

          let { retCode, retMsg } = state.dialogType === 'add' ? await addOrg(params) : await updateOrg(params)
          if (retCode !== 200) return ElMessage.warning(retMsg)
          state.callback()
          closeDialog()
        }
      })
    }

    const initForm = () => {
      formRef.value.resetFields()
      state.ruleForm.parentId = 0
      state.ruleForm.orgLevel = 1
      state.ruleForm.orgName = ''
      state.ruleForm.status = 0
      state.ruleForm.orgSort = ''
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
