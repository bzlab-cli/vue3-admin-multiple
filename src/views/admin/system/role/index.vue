<template>
  <div class="role-container">
    <el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-button size="small" type="primary" @click="onOpenAddRole({})">新增角色</el-button>
        <div class="box-right">
          <el-input
            class="mr10"
            v-model="tableData.params.roleName"
            size="small"
            placeholder="请输入角色名称"
            prefix-icon="el-icon-search"
            style="max-width: 180px"
          ></el-input>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </div>
      </div>
      <el-table :data="tableData.data" stripe style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <el-tag :type="row.status == 0 ? '' : 'danger'">{{ row.status == 0 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orgName" label="组织" show-overflow-tooltip>
          <template #default="scope">
            <span v-if="scope.row.orgId === 0">全部</span>
            <span v-else>{{ scope.row.orgName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operate" label="操作" width="90">
          <template #default="scope">
            <el-button size="mini" type="text" v-if="scope.row.editFlag === 1" @click="onOpenAuthorize(scope.row)">
              授权
            </el-button>
            <el-button size="mini" type="text" v-if="scope.row.editFlag === 1" @click="onOpenEditRole(scope.row)">
              修改
            </el-button>
            <!-- <el-button size="mini" type="text" @click="onRowDel(scope.row)">删除</el-button> -->
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
    <add-role ref="addRoleRef" />
    <add-authorize ref="addAuthorizeRef" />
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted } from 'vue'
import AddRole from './components/add-role.vue'
import AddAuthorize from './components/add-authorize.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getRoleList } from '@/api/auth/role'

export default {
  name: 'role',
  components: { AddRole, AddAuthorize },
  setup() {
    const addRoleRef = ref()
    const addAuthorizeRef = ref()
    const state: any = reactive({
      tableData: {
        data: [],
        total: 0,
        loading: false,
        params: {
          roleName: '',
          status: '',
          pageNum: 1,
          pageSize: 10
        }
      }
    })
    // 初始化表格数据
    const initTableData = async () => {
      let { data, retCode, retMsg } = await getRoleList(state.tableData.params)
      if (retCode !== 200) return ElMessage.warning(retMsg)
      state.tableData.data = data.list || []
      state.tableData.total = data.total
    }

    const handleSearch = () => {
      state.tableData.params.pageNum = 1
      initTableData()
    }

    const onOpenAuthorize = row => {
      addAuthorizeRef.value.openDialog(row, () => {
        initTableData()
      })
    }

    // 打开新增菜单弹窗
    const onOpenAddRole = row => {
      row.dialogType = 'add'
      row.dialogTitle = '新增角色'
      addRoleRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 打开编辑菜单弹窗
    const onOpenEditRole = row => {
      row.dialogType = 'update'
      row.dialogTitle = '编辑角色'
      addRoleRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 当前行删除
    const onRowDel = row => {
      console.log(row)
      ElMessageBox.confirm('确认删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(row)
        })
        .catch(() => {})
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
    // 页面加载时
    onMounted(() => {
      initTableData()
    })
    return {
      addRoleRef,
      addAuthorizeRef,
      onOpenAuthorize,
      onOpenAddRole,
      onOpenEditRole,
      handleSearch,
      onRowDel,
      onHandleSizeChange,
      onHandleCurrentChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-container {
  .system-user-search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
