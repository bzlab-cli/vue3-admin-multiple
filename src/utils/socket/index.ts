/*
 * @Author: jrucker
 * @Description: socket工具类
 * @Date: 2022/07/11 15:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/07/12 16:38:04
 * @Examples: 
 * ```
 * // 初始化socket
  const socket = new Socket(props.wsServerName, {
    format: 'json',
    reconnection: true, // 重连
    reconnectionAttempts: 3, // 重连次数
    reconnectionDelay: 5000 // 重连间隔
  })
  // 检测心跳
  socket.onopen = () => {
    socket.checkHeart()
  }
  // 接收消息
  socket.onmessage = data => {
    if (data.data === 'pong') return
    const msg = JSON.parse(data.data)
    console.log('msg', msg)
  }
  // 发送消息
  socket.send(JSON.stringify(reqBody))
 * ```
 */

export default class Socket {
  private format: string
  private connectionUrl: string
  private opts: any
  private reconnection: any
  private reconnectionAttempts: number
  private reconnectionDelay: number
  private pingIntervalDelay: number
  private pongIntervalDelay: number
  private reconnectTimeoutId: any
  private reconnectionCount: number
  private state: string | any
  private pingInterval: any
  private pongInterval: any
  private webSocket: any
  private send: void | any
  constructor(connectionUrl, opts = {} as any) {
    this.format = opts.format && opts.format.toLowerCase()

    if (connectionUrl.startsWith('//')) {
      //查看链接开头是否为'//
      const scheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
      connectionUrl = `${scheme}:${connectionUrl}`
    }

    this.connectionUrl = connectionUrl
    this.opts = opts

    this.reconnection = this.opts.reconnection || false //是否重新链接
    this.reconnectionAttempts = this.opts.reconnectionAttempts || Infinity //连接次数
    this.reconnectionDelay = this.opts.reconnectionDelay || 1000 //时长
    this.pingIntervalDelay = this.opts.pingIntervalDelay || 10000 //ping心跳时长
    this.pongIntervalDelay = this.opts.pongIntervalDelay || 20000 //pong心跳时长
    this.reconnectTimeoutId = 0
    this.reconnectionCount = 0

    this.connect(connectionUrl, opts)
    this.onEvent()
  }

  connect(connectionUrl, opts = {} as any) {
    const protocol = opts.protocol || ''
    this.webSocket =
      opts.webSocket || (protocol === '' ? new WebSocket(connectionUrl) : new WebSocket(connectionUrl, protocol))
    if (this.format === 'json') {
      this.send = obj => this.webSocket.send(obj)
    }

    return this.webSocket
  }

  reconnect() {
    if (this.reconnectionCount <= this.reconnectionAttempts) {
      this.reconnectionCount++
      clearTimeout(this.reconnectTimeoutId)

      this.reconnectTimeoutId = setTimeout(() => {
        this.connect(this.connectionUrl, this.opts)
        this.onEvent()
      }, this.reconnectionDelay)
    }
  }

  onEvent() {
    ;['onmessage', 'onclose', 'onerror', 'onopen'].forEach(eventType => {
      this.webSocket[eventType] = event => {
        if (this[eventType]) {
          this[eventType](event)
        }

        if (this.reconnection && eventType === 'onclose') {
          console.log('onclose')
          this.reconnect()
        }
      }
    })
  }

  checkHeart() {
    this.state = 'ping'
    const pingIntervalFn = () => {
      if (this.webSocket.readyState === 1) this.webSocket.send('ping')
    }
    const pongIntervalFn = () => {
      this.state = null
      if (this.state === 'ping') {
        clearInterval(this.pingInterval)
        clearInterval(this.pongInterval)
      }
      this.state = 'ping'
    }
    this.pingInterval = setInterval(pingIntervalFn, this.pingIntervalDelay)
    this.pongInterval = setInterval(pongIntervalFn, this.pongIntervalDelay)
  }
}
