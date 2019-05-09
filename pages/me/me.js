// pages/me/me.js
let card = require('../../api/card.js')
let order = require('../../api/order.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    accreditDialogVisible: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  meMemberTap: function () {
    card.getCard().then(res => {
      wx.navigateTo({
        url: '/pages/me/myMember/member?cardInfo=' + JSON.stringify(res.data)
      })

    }).catch(e => {
      this.toast('消息提示', '对不起，你还未领取会员卡，请先领取会员')
    })
  },

  hideToast() {
    this.setData({
      toastShow: false
    })
  },

  toast: function (title, content) {
    this.setData({
      toastTitle: title,
      toastContent: content,
      toastShow: true
    })
  },

  myOrderTap() {
    order.todayOrder().then(res => {
      this.setData({
        todayOrderToastShow: true,
        orderInfo: res.data
      })

    }).catch(e => {
      this.toast('消息提示', e)
    })
  },

  hideTodayOrderTast(){
    this.setData({
      todayOrderToastShow: false
    })
  },

  hideAccreditDialog(){
    this.setData({
      accreditDialogVisible: false
    })
  },

  onGetUserInfo(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    if(e.detail.userInfo){
      this.hideAccreditDialog()
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      console.log('授权失败')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.hideAccreditDialog()
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.hideAccreditDialog()
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.hideAccreditDialog()
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!app.globalData.userInfo) {
      this.setData({
        accreditDialogVisible:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})