const io = require('../../utils/weapp.socket.io.js')
// socket 连接地址
var socketUrl = 'ws://localhost:3000?token=qwerqt'
// socket 状态更新
var socketMessage = ''
// 上下文对象
var that


Page({
  data: {
    value: "",
    show: false,
    rightShow: false,
    checked: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    // this.socketStart();
  },
  onInputConfirm({
    detail
  }) {
    // event.detail 为当前输入的值
    this.setData({
      value:""
    })
  },
  /**
   * 
   */
  bindShowActionSheets() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  showEditContent() {
    this.setData({
      rightShow: true
    });
  },
  onRightClose() {
    this.setData({
      rightShow: false
    });
  },
  onSwitchChange({
    detail
  }) {
    wx.showModal({
      title: '提示',
      content: '是否切换开关？',
      success: res => {
        if (res.confirm) {
          this.setData({
            checked: detail
          });
        }
      }
    });
  },
  setClipboard() {
    wx.setClipboardData({
      data: 'ok',
      success(res) {
        console.log(res);
        if (res.errMsg === "setClipboardData:ok") {
          wx.showToast({
            title: '复制密码成功',
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 启动socket
   */
  socketStart: function() {

    // 设置socket连接地址 socketUrl
    const socket = (this.socket = io(
      socketUrl,
    ))

    socket.on('connect', () => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET连接成功 → \n\n'
      })

      // 此处修改为与server约定的数据、格式
      // var sendMessage = '{"token":"v3jsoc8476shNFhxgqPAkkjt678","client":"发送内容"}'
      // this.socketSendMessage(sendMessage);
      socket.emit('add user', "yuhai");
    })

    socket.on('connect_error', d => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET连接失败 → \n\n'
      })
    })

    socket.on('connect_timeout', d => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET连接超时 → \n\n'
      })
    })

    socket.on('disconnect', reason => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET连接断开 → \n\n'
      })
    })

    socket.on('reconnect', attemptNumber => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET正在重连 → \n\n'
      })
    })

    socket.on('reconnect_failed', () => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET重连失败 → \n\n'
      })
    })

    socket.on('reconnect_attempt', () => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET正在重连 → \n\n'
      })
    })

    socket.on('error', err => {
      this.setData({
        socketMessage: socketMessage += 'SOCKET连接错误 → \n\n'
      })
    })

    socket.on('new message', function(d) {
      that.setData({
        socketMessage: socketMessage += '服务器返回数据 → \n\n'
      })
      console.log(d);
      that.socketReceiveMessage(JSON.stringify(d))
    })

  },

  /**
   * 断开socket
   */
  socketStop: function() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  },

  /**
   * 发送消息
   */
  socketSendMessage: function(sendStr) {
    if (this.socket) {
      this.setData({
        socketMessage: socketMessage += '向服务器发送数据 → ' + sendStr + '\n\n'
      })
      this.socket.emit('new message', sendStr);
    }
  },

  /**
   * 接收消息
   */
  socketReceiveMessage: function(receivedStr) {
    this.setData({
      socketMessage: socketMessage += '服务器返回数据 → ' + receivedStr + '\n\n'
    })
    // this.socketStop();
  },

  onInputChange(e) {
    console.log(e);
    const value = e.detail.value;
    this.setData({
      value: value
    })
  },
  submit() {
    this.socketSendMessage(this.data.value);
    this.setData({
      value: ""
    })
  },
  onShareAppMessage(res) {
    console.log(res)
  }
})