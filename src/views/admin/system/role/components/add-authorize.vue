<template>
  <div class="role-container">
    <el-dialog title="菜单授权" v-model="isShowDialog" width="500px" @close="onCancel">
      <el-form :model="ruleForm" size="small" label-width="80px">
        <el-form-item label="权限" prop="role">
          <el-card shadow="never" :body-style="{ padding: 0, height: '400px' }">
            <el-scrollbar>
              <el-tree
                class="menu-tree"
                ref="tree"
                :data="menuList"
                node-key="id"
                default-expand-all
                :props="{ label: 'name' }"
                empty-text="暂无数据"
                show-checkbox
                :check-strictly="true"
                highlight-current
              >
                <template v-slot="{ data }">
                  <span :data-roleId="data.id" :class="{ ve_tree_item: data.type == 2 }">{{ data.name }}</span>
                </template>
              </el-tree>
            </el-scrollbar>
          </el-card>
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
import { reactive, ref, toRefs } from 'vue'
import { getMenuGrantByRoleId, roleMenuGrant } from '@/api/auth/role'
import { ElMessage } from 'element-plus'
import { forEachTree } from '@/utils'

export default {
  name: 'add-authorize',
  setup() {
    const tree = ref(null)
    const menuList: any = ref([])
    const state = reactive({
      isShowDialog: false,
      callback: function () {},
      id: '',
      ruleForm: {}
    })
    const queryMenuList = async () => {
      let { data, retCode, retMsg } = await getMenuGrantByRoleId({ roleId: state.id })
      if (retCode !== 200) return ElMessage.warning(retMsg)
      let list = data || []
      let menuIds: string[] = []
      let childrenName = 'childTreeList'
      forEachTree(list, item => {
        if (item[childrenName]) {
          item.name = item.menuName
          item.children = item[childrenName]
          if (item.grantFlag) {
            menuIds.push(item.id)
          }
        }
      })

      menuList.value = list
      ;(tree.value as any).setCheckedKeys(menuIds)
    }
    // 打开弹窗
    const openDialog = (row, callback) => {
      console.log('openDialog', row)
      state.isShowDialog = true
      state.id = row.id
      state.callback = callback
      queryMenuList()
    }

    const closeDialog = () => {
      state.isShowDialog = false
    }

    const onCancel = () => {
      closeDialog()
    }

    const onSubmit = async () => {
      let checkedNodes = (tree.value as any).getCheckedNodes(false, true)
      let menuIds = checkedNodes.filter(t => t.menuType === 3).map(t => t.id)
      let params = {
        menuIdList: menuIds,
        roleId: state.id
      }
      let { retCode, retMsg } = await roleMenuGrant(params)
      if (retCode !== 200) return ElMessage.warning(retMsg)
      ElMessage.success('授权成功')
      state.callback()
      closeDialog() // 关闭弹窗
    }

    return {
      tree,
      menuList,
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
