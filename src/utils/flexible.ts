/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/08/30 16:34:13
 * @LastEditors: jrucker
 * @LastEditTime: 2022/01/26 11:32:05
 */

;(function flexible(window, document) {
  const docEl = document.documentElement
  // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值
  const dpr = window.devicePixelRatio || 1

  // 设置默认字体大小，默认的字体大小继承自body
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  function setRemUnit() {
    // 设置成24等份，设计稿为1920时，1rem=80px
    const rem = docEl.clientWidth / 24
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // 当页面展示或重新设置大小的时候，触发重新
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // 检测0.5px的支持，支持则root元素的class中有hairlines
  if (dpr >= 2) {
    const fakeBody = document.createElement('body')
    const testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)
