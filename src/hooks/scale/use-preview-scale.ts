import throttle from '@bzlab/bz-core'

// 屏幕缩放适配（两边留白）
export const usePreviewFitScale = (width, height, screenDom, scaleDom, callback?) => {
  // 画布尺寸（px）
  const baseWidth = width
  const baseHeight = height

  // 默认缩放值
  const scale = {
    width: 1,
    height: 1
  }

  // 保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
  const calcRate = () => {
    // 当前屏幕宽高比
    const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (scaleDom) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5))
        scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5))
        const offsetX = ((baseWidth - baseWidth * scale.width) / 2).toFixed(0)
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
        screenDom.style.margin = `0 ${offsetX}px`
      } else {
        // 表示更高
        scale.height = parseFloat((window.innerWidth / baseProportion / baseHeight).toFixed(5))
        scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5))
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`
        screenDom.style.margin = 0
      }
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize
  }
}

// 变形内容，宽高铺满
export const usePreviewFullScale = (width, height, scaleDom, callback?) => {
  // 默认缩放值
  const scale = {
    width: 1,
    height: 1
  }

  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat((window.innerWidth / width).toFixed(5))
      scale.height = parseFloat((window.innerHeight / height).toFixed(5))
      scaleDom.style.transform = `scale(${scale.width})`
      if (callback) callback(scale)
    }
  }

  const resize = throttle(() => {
    calcRate()
  }, 200)

  // 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize)
  }

  // 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    calcRate,
    windowResize,
    unWindowResize
  }
}
