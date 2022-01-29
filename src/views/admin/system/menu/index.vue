<template>
  <div class="menu-container">
    <el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-button size="small" type="primary" @click="onOpenAddMenu({})">新增菜单</el-button>
        <div class="box-right">
          <el-input
            class="mr10"
            v-model="tableData.params.menuName"
            size="small"
            placeholder="请输入菜单名称"
            prefix-icon="el-icon-search"
            style="max-width: 180px"
          ></el-input>
          <el-button size="small" type="primary" @click="handleSearch">查询</el-button>
        </div>
      </div>
      <el-table
        :data="tableData.data"
        stripe
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'childTreeList', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="菜单名称" show-overflow-tooltip width="150">
          <template #default="scope">
            <i :class="scope.row.menuIcon"></i>
            <span>{{ scope.row.menuName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="menuIcon" label="图标" show-overflow-tooltip width="50">
          <template #default="scope">
            <i :class="scope.row.menuIcon"></i>
          </template>
        </el-table-column> -->
        <el-table-column prop="menuType" label="类型">
          <template v-slot="{ row }">
            <el-tag v-if="row.menuType === 1">目录</el-tag>
            <el-tag type="success" v-if="row.menuType === 2">菜单</el-tag>
            <el-tag type="warning" v-if="row.menuType === 3">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="menuCode" label="权限标识" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column label="组件地址" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.menuComponents }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组件名称" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.menuRoute }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="menuSort" label="排序" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="hiddenFlag" label="是否显示">
          <template v-slot="{ row }">
            <el-tag :type="row.hiddenFlag == 0 ? 'danger' : ''">{{ row.hiddenFlag == 0 ? '隐藏' : '显示' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <el-tag :type="row.status == 0 ? '' : 'danger'">{{ row.status == 0 ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="100">
          <template #default="scope">
            <el-button size="mini" type="text" @click="onOpenEditMenu(scope.row)">修改</el-button>
            <!-- <el-button size="mini" type="text" @click="onTabelRowDel(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-menu ref="addMenuRef" />
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, onMounted } from 'vue'
import AddMenu from './components/add-menu.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getMenuList } from '@/api/auth/menu'

export default {
  name: 'menu',
  components: { AddMenu },
  setup() {
    const addMenuRef = ref()
    const state = reactive({
      tableData: {
        data: [],
        loading: false,
        params: {
          menuName: '',
          status: ''
        }
      }
    })

    const initTableData = async () => {
      let { data, retCode, retMsg } = await getMenuList(state.tableData.params)
      if (retCode !== 200) return ElMessage.warning(retMsg)
      let list = data || []
      state.tableData.data = list
    }

    const handleSearch = () => {
      initTableData()
    }

    const onOpenAddMenu = row => {
      row.dialogType = 'add'
      row.dialogTitle = '新增菜单'
      row.tableData = state.tableData.data
      addMenuRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 打开编辑菜单弹窗
    const onOpenEditMenu = row => {
      row.dialogType = 'update'
      row.dialogTitle = '编辑菜单'
      row.tableData = state.tableData.data
      addMenuRef.value.openDialog(row, () => {
        initTableData()
      })
    }
    // 删除当前行
    const onTabelRowDel = (row: object) => {
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
    onMounted(() => {
      initTableData()
    })
    return {
      addMenuRef,
      onOpenAddMenu,
      onOpenEditMenu,
      handleSearch,
      onTabelRowDel,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  .system-user-search {
    display: flex;
    justify-content: space-between;
  }
}
</style>
