<template>
  <div ref="screenRef" class="screen-box">
    <div :class="`scale-box ${editCanvasConfig.previewScaleType}`">
      <div ref="previewRef" class="preview-scale" :style="previewRefStyle">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useScale } from '@/hooks/scale/use-scale'
import { editCanvasConfig } from '@/constant/layout'

export default defineComponent({
  setup() {
    const { screenRef, previewRef } = useScale()
    const previewRefStyle = computed(() => {
      return {
        position: 'relative',
        width: editCanvasConfig.width ? `${editCanvasConfig.width}px` : '100%',
        height: editCanvasConfig.height ? `${editCanvasConfig.height}px` : '100%'
      }
    })

    return {
      editCanvasConfig,
      screenRef,
      previewRef,
      previewRefStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.screen-box {
  overflow: hidden;
}
.scale-box {
  position: relative;
  height: 100vh;
  transition: all 0.3s linear;
}
.scale-box.fit,
.scale-box.full {
  overflow: hidden;
}
.scale-box.fit .preview-scale,
.scale-box.full .preview-scale {
  transform-origin: 0 0;
}
</style>
