<template>
  <div class="user-container">
    <el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-button size="small" type="primary" @click="onOpenAddUser({})">新增用户</el-button>
        <div class="box-right">
          <el-input
            class="mr10"
            v-model="tableData.params.userName"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            placeholder="请输入用户名"
            style="width: 180px"
          ></el-input>
          <el-input
            class="mr10"
            v-model="tableData.params.phone"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            placeholder="请输入手机号"
            style="width: 180px"
          ></el-input>
          <tree-select
            v-model="tableData.params.eqOrgId"
            :list="treeSelectList"
            placeholder="请选择组织"
            @tree-select="handleTreeSelect"
            class="mr10"
            style="width: 180px"
          />
          <el-select
            v-model="tableData.params.eqRoleId"
            placeholder="请选择角色"
            clearable
            class="mr10"
            style="width: 180px"
          >
            <el-option :value="item.id" :label="item.roleName" v-for="(item, i) in roleList" :key="i"></el-option>
          </el-select>
          <el-select
            v-model="tableData.params.forbiddenStatus"
            placeholder="请选择状态"
            clearable
            class="mr10"
            style="width: 180px"
          >
            <el-option :value="item.id" :label="item.name" v-for="(item, i) in statusList" :key="i"></el-option>
          </el-select>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </div>
      </div>
      <el-table :data="tableData.data" stripe style="width: 100%">
        <el-table-column prop="userName" label="用户名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleName" label="角色" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgName" label="组织" show-overflow-tooltip>
          <template #default="{ row }">
            <span v-if="row.roleId === 'ad'">-</span>
            <span v-if="row.roleId !== 'ad'">{{ row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="professional" label="专业" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ professionalFilter(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="forbiddenStatus" label="状态">
          <template v-slot="{ row }">
            <el-tag :type="row.forbiddenStatus == 1 ? '' : 'danger'">
              {{ row.forbiddenStatus == 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operate" label="操作" width="180">
          <template #default="scope">
            <el-button size="mini" type="text" @click="onOpenEditUser(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="onRowEnableChange(scope.row, scope.row.forbiddenStatus == 1 ? 0 : 1)"
            >
              {{ scope.row.forbiddenStatus == 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button size="mini" type="text" @click="handleResetPassword(scope.row)">重置密码</el-button>
            <el-button size="mini" type="text" @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="onHandleSizeChange"
        @current-change="onHandleCurrentChange"
        class="a-right mt15"
        :pager-count="5"
        :page-sizes="[10, 20, 30]"
        v-model:current-page="tableData.params.pageNum"
        background
        v-model:page-size="tableData.params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </el-card>
    <add-user ref="addUserRef" />
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted } from 'vue'
import addUser from './components/add-user.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUserList, resetPassword, deleteUser, updateUserForbiddenStatus } from '@/api/auth/user'
import { getOrgList } from '@/api/auth/org'
import { getRoleSelect2 } from '@/api/auth/role'
import { forEachTree } from '@/utils'
import { IMajorSchema, majorList } from '@/constant/major'
import treeSelect from '@/components/tree-select/index.vue'

const status = [
  {
    name: '启用',
    id: 1
  },
  {
    name: '禁用',
    id: 0
  }
]

interface IStatus {
  name: string
  id: number
}

export default {
  name: 'user',
  components: { addUser, treeSelect },
  computed: {
    professionalFilter() {
      return row => {
        let item = majorList.find(t => t.value !== 0 && t.value === row.professional) as IMajorSchema
        if (item) {
          return item.name
        }
      }
    }
  },
  setup() {
    const treeSelectList = ref([])
    const roleList = ref([])
    const statusList = ref<IStatus[]>(status)
    const addUserRef = ref()
    const state: any = reactive({
      tableData: {
        data: [],
        total: 0,
        loading: false,
        params: {
          eqOrgId: null,
          eqRoleId: null,
          userName: null,
          phone: null,
          forbiddenStatus: null,
          pageNum: 1,
          pageSize: 10
        }
      },
      orgList: [],
      majorList
    })

    const setOrgTreeList = data => {
      let childrenName = 'childTreeList'
      forEachTree(data, item => {
        if (item[childrenName]) {
          item.label = item.orgName
          item.value = item.id
        }
      })
      ;(treeSelectList.value as any) = data
    }

    const fetchOrgList = async () => {
      let { data, retCode, retMsg } = await getOrgList({})
      if (retCode !== 200) return ElMessage.warning(retMsg)
      setOrgTreeList(data || [])
    }
    // 初始化表格数据
    const initTableData = async () => {
      let { eqOrgId, eqRoleId, userName, phone, forbiddenStatus } = state.tableData.params
      state.tableData.params.eqOrgId = eqOrgId || null
      state.tableData.params.eqRoleId = eqRoleId || null
      state.tableData.params.userName = userName || null
      state.tableData.params.phone = phone || null
      if (forbiddenStatus === '') {
        state.tableData.params.forbiddenStatus = null
      }

      let { data, retCode, retMsg } = await getUserList(state.tableData.params)
      if (retCode !== 200) return ElMessage.warning(retMsg)
      state.tableData.data = data.list || []
      state.tableData.total = data.total
    }
    const handleSearch = () => {
      state.tableData.params.pageNum = 1
      initTableData()
    }
    // 打开新增菜单弹窗
    const onOpenAddUser = row => {
      row.dialogType = 'add'
      row.dialogTitle = '新增用户'
      addUserRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 打开编辑菜单弹窗
    const onOpenEditUser = row => {
      row.dialogType = 'update'
      row.dialogTitle = '编辑用户'
      addUserRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    const handleOrgClick = node => {
      console.log('handleOrgClick', node)
      state.tableData.params.eqOrgId = node.id
      initTableData()
    }
    const handleResetPassword = async row => {
      let { retCode, retMsg } = await resetPassword({ userId: row.userId })
      if (retCode !== 200) return ElMessage.warning(retMsg)
      ElMessage.success('重置成功')
    }
    // 当前行删除
    const onRowDel = row => {
      console.log(row)
      ElMessageBox.confirm('确认删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let { retCode, retMsg } = await deleteUser({ userId: row.userId })
          if (retCode !== 200) return ElMessage.warning(retMsg)
          initTableData()
          ElMessage.success('操作成功')
        })
        .catch(() => {})
    }

    const onRowEnableChange = (row, flag) => {
      ElMessageBox.confirm(`确认${flag === 0 ? '禁用' : '启用'}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let { retCode, retMsg } = await updateUserForbiddenStatus({ userId: row.userId, forbiddenStatus: flag })
          if (retCode !== 200) return ElMessage.warning(retMsg)
          initTableData()
          ElMessage.success('操作成功')
        })
        .catch(() => {})
    }
    const fetchRoleList = async () => {
      let { data, retCode, retMsg } = await getRoleSelect2({})
      if (retCode !== 200) return ElMessage.warning(retMsg)
      roleList.value = data
    }
    // 分页改变
    const onHandleSizeChange = (val: number) => {
      state.tableData.params.pageSize = val
      initTableData()
    }
    // 分页改变
    const onHandleCurrentChange = (val: number) => {
      state.tableData.params.pageNum = val
      initTableData()
    }
    const handleTreeSelect = data => {
      state.tableData.params.eqOrgId = data.id
    }
    // 页面加载时
    onMounted(() => {
      fetchRoleList()
      fetchOrgList()
      initTableData()
    })
    return {
      treeSelectList,
      roleList,
      statusList,
      addUserRef,
      onOpenAddUser,
      onOpenEditUser,
      handleResetPassword,
      handleSearch,
      handleOrgClick,
      onRowDel,
      onRowEnableChange,
      onHandleSizeChange,
      onHandleCurrentChange,
      handleTreeSelect,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  .system-user-search {
    display: flex;
    justify-content: space-between;
    .box-right {
      display: flex;
      align-items: center;
      :deep(.el-input--medium .el-input__inner) {
        height: 32px;
        line-height: 32px;
      }
    }
    :deep(.el-card__body) {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
