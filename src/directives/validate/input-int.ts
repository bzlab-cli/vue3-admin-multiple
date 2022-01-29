/*
 * @Author: jrucker
 * @Description: 验证整数
 * v-input-int 可选参数 默认去掉开头0 正整数 + 0
 * beforeZero 数字随意输，不做处理0010
 * noZero 去掉开头0 正整数
 * @Date: 2021/10/28 17:17:06
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/28 17:57:34
 */

const directives = {
  mounted(el, binding, vnode) {
    let input = vnode.el
    if (input.tagName !== 'INPUT') {
      input = input.querySelector('input')
    }
    if (!input) return
    input.addEventListener('compositionstart', () => {
      vnode.inputLocking = true
    })
    input.addEventListener('compositionend', () => {
      vnode.inputLocking = false
      input.dispatchEvent(new Event('input'))
    })
    input.addEventListener(
      'input',
      e => {
        e.preventDefault()
        if (vnode.inputLocking) {
          return
        }
        const oldValue = input.value
        let newValue = input.value.replace(/[^\d]/g, '')
        if (newValue) {
          switch (binding.value) {
            case 'beforeZero':
              break
            case 'noZero':
              newValue = newValue.replace(/^\b(0+)/gi, '')
              break
            default:
              newValue = Number(newValue).toString()
          }
        }
        if (newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input'))
          input.dispatchEvent(new Event('change'))
        }
      },
      true
    )
  }
}

export default directives
