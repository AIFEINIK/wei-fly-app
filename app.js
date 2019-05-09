let user = require('./api/user.js')

//app.js
App({
  onLaunch: function() {
    console.log('onLaunch')
    user.login()
    // wx.checkSession({
    //   success() {
    //     console.log('登录态正常，无需重新登录')
    //   },
    //   fail() {
    //     user.login()
    //   }
    // })
    
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
      
    })
    
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        //生产环境使用
        // this.globalData.StatusBar = e.statusBarHeight;
        // this.globalData.windowHeight = e.windowHeight;
        // let custom = wx.getMenuButtonBoundingClientRect();
        // this.globalData.Custom = custom;
        // this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;

        //开发环境使用
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.windowHeight = e.windowHeight;
        let custom = {
          "bottom": 58,
          "height": 32,
          "left": 278,
          "right": 365,
          "top": 26,
          "width": 87
        };
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  }
})