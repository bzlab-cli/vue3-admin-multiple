import { ref, onMounted, onUnmounted } from 'vue'
import { usePreviewFitScale, usePreviewFullScale } from '@/hooks/scale/use-preview-scale'
import { editCanvasConfig } from '@/constant/layout'

const PreviewScaleEnum = {
  FIT: 'fit',
  FULL: 'full'
}

export const useScale = () => {
  const screenRef = ref()
  const previewRef = ref()
  const width = ref(editCanvasConfig.width)
  const height = ref(editCanvasConfig.height)

  // 屏幕适配
  onMounted(() => {
    switch (editCanvasConfig.previewScaleType) {
      case PreviewScaleEnum.FIT:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
            width.value,
            height.value,
            screenRef.value,
            previewRef.value
          )
          calcRate()
          windowResize()
          onUnmounted(() => {
            unWindowResize()
          })
        })()
        break
      case PreviewScaleEnum.FULL:
        ;(() => {
          const { calcRate, windowResize, unWindowResize } = usePreviewFullScale(
            width.value,
            height.value,
            previewRef.value
          )
          calcRate()
          windowResize()
          onUnmounted(() => {
            unWindowResize()
          })
        })()
        break
    }
  })

  return {
    screenRef,
    previewRef
  }
}
