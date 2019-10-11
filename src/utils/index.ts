import Taro from '@tarojs/taro'
export function webSocketConnect() {
  Taro.connectSocket({
    url: 'ws://myserver/',
    // url: 'ws://localhost:8080/',
    header: {
      'content-type': 'application/json'
    },
    protocols: ['echo-protocol'],
    method: 'GET'
  })

  Taro.onSocketOpen(function(res) {
    console.log('WebSocket连接已打开！' + res)
  })
  Taro.onSocketError(function(res) {
    console.log('WebSocket连接打开失败，请检查！' + res)
  })
}

export function closeConnect() {
  Taro.closeSocket()
  console.log('关闭连接')
}
