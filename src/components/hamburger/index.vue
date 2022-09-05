<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <i class="icon el-icon-s-unfold"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-click'],
  setup(_, context) {
    const toggleClick = () => {
      context.emit('toggle-click')
    }
    return {
      toggleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  font-size: 21px;
  color: #333;
}

.is-active {
  transform: rotate(180deg);
}
</style>
