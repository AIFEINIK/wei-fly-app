// const BASE_API_URL = 'http://localhost:10300'
const BASE_API_URL = 'https://www.feinik.club:10300'

export function post (url, data) {
  return request(url, 'POST', data)
}

export function get(url, data) {
  return request(url, 'GET', data)
}

function request (url, method, data) {
  var promise = new Promise((resolve, reject) => {
    var that = this;

    //网络请求
    wx.request({
      url: BASE_API_URL + '/' + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log('请求【'+url+'】返回状态：' + res.data.status)
        if (res.data.status == 200) {
          resolve(res.data);
        } else if (res.data.status == 5001) {
          //token失效了，重新登录
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              request('user/frontLogin', 'POST', {'code':res.code}).then(ur => {
                console.log('token失效，重新登录成功， code:' + res.code)
                wx.setStorage({
                  key: 'token',
                  data: ur.data.token,
                })

                wx.setStorage({
                  key: 'user',
                  data: ur.data,
                })

                //重新发起刚才的接口请求
                request(url, method, data).then(s => {
                  resolve(s);
                })
              })
            }
            
          })


        } else {
          reject(res.data.message);
        }
      },
      fail: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}