<template>
  <div class="user-container">
    <el-dialog :title="dialogTitle" v-model="isShowDialog" width="500px" @close="onCancel">
      <el-form :model="ruleForm" :rules="rules" ref="formRef" size="small" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择" clearable style="width: 100%">
            <el-option :value="item.id" :label="item.roleName" v-for="(item, i) in roleList" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="ruleForm.professional" placeholder="请选择" clearable style="width: 100%">
            <el-option
              :value="item.value"
              :label="item.name"
              v-for="(item, i) in professionalSelectList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属组织" prop="orgId" v-if="ruleForm.roleId !== 'ad'">
          <tree-select
            v-model="ruleForm.orgId"
            :list="treeSelectList"
            @tree-select="handleTreeSelect"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="权限" prop="competenceIds">
          <el-select v-model="ruleForm.competenceIds" multiple placeholder="请选择" clearable style="width: 100%">
            <el-option
              :value="item.id"
              :label="item.competenceName"
              v-for="(item, i) in competenceList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="showPassword(dialogType)">
          <el-input v-model="ruleForm.password" placeholder="请输入" clearable></el-input>
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
import treeSelect from '@/components/tree-select/index.vue'
import { addUser, updateUser, getCompetence, getUser } from '@/api/auth/user'
import { ElMessage } from 'element-plus'
import { getRoleSelect2 } from '@/api/auth/role'
import { getOrgSelect2 } from '@/api/auth/org'
import { forEachTree } from '@/utils'
import { IMajorSchema, majorList } from '@/constant/major'

export default {
  name: 'add-user',
  components: {
    treeSelect
  },
  computed: {
    showPassword: () => val => val === 'add'
  },
  setup() {
    const roleList = ref([])
    const treeSelectList = ref([])
    const competenceList = ref([])
    const formRef = ref(null) as any
    const professionalSelectList = ref<IMajorSchema[]>(majorList)
    const state = reactive({
      isShowDialog: false,
      dialogTitle: '新增用户',
      dialogType: 'add',
      userId: '',
      callback: function () {},
      ruleForm: {
        userName: '',
        phone: '',
        headUrl: '',
        roleId: '',
        competenceIds: [],
        professional: '',
        orgId: '',
        email: '',
        password: '',
        remarks: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        orgId: [{ required: true, message: '请选择组织', trigger: 'blur' }]
      }
    })
    // 打开弹窗
    const openDialog = async (row, callback) => {
      console.log('openDialog', row)
      state.isShowDialog = true
      state.dialogType = row.dialogType
      state.dialogTitle = row.dialogTitle
      state.userId = row.userId
      state.callback = callback
      await fetchRoleList()
      await fetchOrgList()
      await fetchCompetenceList()
      if (row.dialogType === 'update') {
        await fetchUser(row.userId)
      }
    }
    const fetchUser = async id => {
      let { data, retCode, retMsg } = await getUser({ userId: id })
      if (retCode !== 200) return ElMessage.warning(retMsg)
      state.ruleForm.userName = data.userName
      state.ruleForm.phone = data.phone
      state.ruleForm.headUrl = data.headUrl
      state.ruleForm.roleId = data.roleId
      state.ruleForm.competenceIds = data.competenceIds || []
      state.ruleForm.orgId = data.orgId
      state.ruleForm.professional = data.professional
      state.ruleForm.email = data.email
      state.ruleForm.password = data.password
      state.ruleForm.remarks = data.remarks
    }
    const fetchRoleList = async () => {
      let { data, retCode, retMsg } = await getRoleSelect2({})
      if (retCode !== 200) return ElMessage.warning(retMsg)
      roleList.value = data
    }
    const fetchCompetenceList = async () => {
      let { data, retCode, retMsg } = await getCompetence({ competenceName: '' })
      if (retCode !== 200) return ElMessage.warning(retMsg)
      competenceList.value = data
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
      console.log('handleTreeSelect', data)
      state.ruleForm.orgId = data.id
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
            account: state.ruleForm.phone,
            userName: state.ruleForm.userName,
            headUrl: state.ruleForm.headUrl,
            phone: state.ruleForm.phone,
            roleId: state.ruleForm.roleId,
            competenceIds: state.ruleForm.competenceIds,
            orgId: state.ruleForm.orgId,
            professional: state.ruleForm.professional,
            email: state.ruleForm.email,
            password: state.ruleForm.password,
            remarks: state.ruleForm.remarks
          } as any

          console.log('params', params)

          if (state.dialogType === 'update') {
            params.userId = state.userId
          }
          let { retCode, retMsg } = state.dialogType === 'add' ? await addUser(params) : await updateUser(params)
          if (retCode !== 200) return ElMessage.warning(retMsg)
          state.callback()
          closeDialog()
        }
      })
    }
    const initForm = () => {
      formRef.value.resetFields()
      state.ruleForm.userName = ''
      state.ruleForm.phone = ''
      state.ruleForm.headUrl = ''
      state.ruleForm.roleId = ''
      state.ruleForm.competenceIds = []
      state.ruleForm.professional = ''
      state.ruleForm.orgId = ''
      state.ruleForm.email = ''
      state.ruleForm.password = ''
      state.ruleForm.remarks = ''
    }
    return {
      formRef,
      roleList,
      competenceList,
      treeSelectList,
      professionalSelectList,
      openDialog,
      closeDialog,
      handleTreeSelect,
      onCancel,
      onSubmit,
      ...toRefs(state)
    }
  }
}
</script>
