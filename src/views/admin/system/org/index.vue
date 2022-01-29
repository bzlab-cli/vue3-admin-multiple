<template>
  <div class="org-container">
    <el-card shadow="hover">
      <div class="org-search mb15">
        <div class="add-org">
          <el-button size="small" type="primary" @click="onOpenAddOrg({})">新增组织</el-button>
        </div>
        <div class="search">
          <el-input
            class="mr10"
            v-model="tableData.params.orgName"
            size="small"
            placeholder="请输入组织名称"
            prefix-icon="el-icon-search"
            style="max-width: 180px"
          ></el-input>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </div>
      </div>
      <el-table
        :data="tableData.data"
        stripe
        row-key="id"
        :tree-props="{ children: 'childTreeList', hasChildren: 'hasChildren' }"
        style="width: 100%"
      >
        <el-table-column prop="orgName" label="组织名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgSort" label="排序" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <el-tag :type="row.status == 0 ? '' : 'danger'">{{ row.status == 0 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operate" label="操作" width="90">
          <template #default="scope">
            <el-button size="mini" type="text" @click="onOpenEditOrg(scope.row)">修改</el-button>
            <!-- <el-button size="mini" type="text" @click="onRowDel(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-org ref="addOrgRef" />
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted } from 'vue'
import AddOrg from './components/add-org.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getOrgList } from '@/api/auth/org'

export default {
  name: 'org',
  components: { AddOrg },
  setup() {
    const addOrgRef = ref()
    const state: any = reactive({
      tableData: {
        data: [],
        total: 0,
        loading: false,
        params: {
          orgName: '',
          status: '',
          pageNum: 1,
          pageSize: 10
        }
      }
    })
    // 初始化表格数据
    const initTableData = async () => {
      let { data, retCode, retMsg } = await getOrgList(state.tableData.params)
      if (retCode !== 200) return ElMessage.warning(retMsg)
      state.tableData.data = data || []
    }

    const handleSearch = () => {
      state.tableData.params.pageNum = 1
      initTableData()
    }

    // 打开新增菜单弹窗
    const onOpenAddOrg = row => {
      row.dialogType = 'add'
      row.dialogTitle = '新增组织'
      addOrgRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 打开编辑菜单弹窗
    const onOpenEditOrg = row => {
      row.dialogType = 'update'
      row.dialogTitle = '编辑组织'
      addOrgRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 当前行删除
    const onRowDel = (row: object) => {
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

    // 页面加载时
    onMounted(() => {
      initTableData()
    })
    return {
      addOrgRef,
      onOpenAddOrg,
      onOpenEditOrg,
      handleSearch,
      onRowDel,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-container {
  .org-search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
