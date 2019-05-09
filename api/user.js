let req = require('../utils/request.js')

export function login() {
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      req.post('user/frontLogin', { 'code': res.code }).then(ur => {
        console.log('登录成功， code:' + res.code)
        wx.setStorage({
          key: 'token',
          data: ur.data.token,
        })

        wx.setStorage({
          key: 'user',
          data: ur.data,
        })

      }).catch(err => {
        console.log(err)
      })
    }
  })
}