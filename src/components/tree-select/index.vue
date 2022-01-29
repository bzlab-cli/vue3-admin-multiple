<template>
  <el-select
    ref="mySelect"
    v-bind="$attrs"
    v-model="optionValue"
    :multiple="false"
    :disabled="disabled"
    :placeholder="placeholder"
    :clearable="clearable"
    @change="onChange"
  >
    <el-option :value="optionValue" :label="optionValue" class="options">
      <el-tree
        class="tree-option"
        ref="selectTree"
        default-expand-all
        :expand-on-click-node="false"
        :data="list"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue'

export default defineComponent({
  name: 'tree-select',
  props: {
    modelValue: { type: String, default: '' },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    list: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['nodeClick', 'update:modelValue'],
  setup(props, context) {
    const mySelect = ref()
    const optionValue = ref('')

    function getLable(arr, value) {
      let res = ''
      function find(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === value) {
            res = arr[i].label
          }
          if (arr[i].children && arr[i].children.length) {
            find(arr[i].children, value)
          }
        }
      }
      find(arr, value)
      return res
    }
    watch(
      () => {
        return props.modelValue
      },
      () => {
        optionValue.value = getLable(props.list, props.modelValue)
      }
    )
    onMounted(() => {
      optionValue.value = getLable(props.list, props.modelValue)
    })

    function handleNodeClick(node) {
      optionValue.value = node.label
      mySelect.value.blur()
      context.emit('tree-select', node)
      context.emit('update:modelValue', node.value)
    }

    const onChange = val => {
      if (!val) {
        optionValue.value = null
        context.emit('update:modelValue', null)
      }
    }
    return {
      mySelect,
      handleNodeClick,
      optionValue,
      onChange
    }
  }
})
</script>

<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
:deep(.el-tree .el-tree-node__content) {
  height: 34px !important;
}
</style>
