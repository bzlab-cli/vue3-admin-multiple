/*
 * @Author: jrucker
 * @Description: 验证浮点数小数位
 * v-input-float="2" 两位小数
 * @Date: 2021/10/28 17:17:06
 * @LastEditors: jrucker
 * @LastEditTime: 2021/10/28 19:43:07
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
        let newValue = input.value
        //把数字以外的便会空
        if (newValue.slice(0, 1) !== '-') {
          newValue = newValue.replace(/[^\d.]/g, '')
        }
        newValue = newValue.replace(/^\./g, '')
        console.log('newValue1', newValue)
        newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        console.log('newValue2', newValue)
        const decimal = Number(binding.value) || 2
        console.log('newValue3', newValue)
        const reg = new RegExp(`^(\\-)*(\\d+)\\.(\\d{${decimal}}).*$`)
        console.log('newValue4', newValue)
        newValue = newValue.replace(reg, '$1$2.$3')
        console.log('newValue5', newValue)
        if (newValue == '-') return
        if (newValue) {
          const arr = newValue.split('.')
          newValue = Number(arr[0]) + (arr[1] === undefined ? '' : '.' + arr[1]) // 去掉开头多余的0
          console.log('newValue6', newValue)
        }
        if (newValue !== oldValue) {
          input.value = newValue
          input.dispatchEvent(new Event('input'))
        }
      },
      true
    )
    input.addEventListener('blur', () => {
      const oldValue = input.value
      let newValue = input.value
      if (newValue) {
        newValue = Number(newValue).toString()
      }
      if (newValue !== oldValue) {
        input.value = newValue
        input.dispatchEvent(new Event('input'))
      }
    })
  }
}

export default directives
