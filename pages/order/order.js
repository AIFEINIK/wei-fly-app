// pages/order/order.js
let seat = require('../../api/seat.js')
let order = require('../../api/order.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seatContainerHeight: app.globalData.windowHeight,
    seatList: [],
    seatOrder:{
      seatType:{
        ONE_SEAT: '1',
        TWO_SEAT: '2',
        THREE_SEAT: '3'
      },
      selectedSeatNum:[]
    },
    gridCol: 4,
    gridBorder: true,
    seatOrderForm:{
      useTime: '09:00',
      seatNum:''
    },
    CustomBar: app.globalData.CustomBar,
    loadProgress: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.searchSeatList()
  },

  searchSeatList: function() {
    seat.listSeat().then(res => {
      this.handleSeatList(res.data.datas)

    }).catch(res => {
      console.log(res)
      wx.showToast({
        title: '网络错误',
        image: '../../images/con_err.png',
        duration: 2000
      })
    })
  },

  handleSeatList: function (datas) {
    let tmpSeatList = []
    datas.forEach((obj, index) => {
      let selected_seat_num = 'seatOrder.selectedSeatNum[' + index + '].show';
      this.setData({
        [selected_seat_num]: false
      })
      tmpSeatList.push({
        icon: 'brandfill',
        color: obj.locked === 'YES' ? 'red' : 'green',
        badge: this.data.seatOrder.seatType[obj.seatType],
        num: obj.num,
        seatId: obj.id
      })
    })

    this.setData({
      seatOrder : this.data.seatOrder,
      seatList: tmpSeatList
    })
  },

  orderTimeChange(e) {
    this.data.seatOrderForm.useTime = e.detail.value
    this.setData({
      seatOrderForm: this.data.seatOrderForm
    })
  },

  handleOrderDialog: function (o) {
    //检查是否为会员
    var user = wx.getStorageSync('user')
    if (user && user.roleType === 'CUSTOMER'){
      this.toast('消息提示', '对不起，您还不是会员用户，不支持在线预约！')
      return
    }

    this.data.seatOrderForm.seatNum = o.currentTarget.dataset.seatnum
    this.data.seatOrderForm.seatId = o.currentTarget.dataset.seatid
    this.setData({
      seatOrderDialogVisible:true,
      useTime: '09:00',
      seatOrderForm: this.data.seatOrderForm
    })
  },

  hideSeatOrderDialog: function(){
    this.setData({
      seatOrderDialogVisible: false
    })
  },

  hideToast() {
    this.setData({
      toastShow: false
    })
  },

  seatTouchHandle: function(o){
    var index = o.currentTarget.dataset.index
    this.data.seatOrder.selectedSeatNum[index].show = !this.data.seatOrder.selectedSeatNum[index].show
    this.setData({
      seatOrder: this.data.seatOrder
    })
  },

  seatOrderSubmit: function(o){
    order.createOrder(this.data.seatOrderForm).then(res => {
      console.log('预约成功了')
      this.hideSeatOrderDialog()
      this.toast('预约成功', '恭喜您预约成功，座位号：' + this.data.seatOrderForm.seatNum + ', 预约使用时间为：' + res.data.useTime)
      this.searchSeatList()

    }).catch(e => {
      console.error(e)
      this.hideSeatOrderDialog()
      this.toast('消息提示', e)
    })
  },

  toast: function(title, content) {
    this.setData({
      toastTitle: title,
      toastContent: content,
      toastShow: true
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉刷新座位信息')
    wx.showNavigationBarLoading()
    this.loadProgress()
    seat.listSeat().then(res => {
      this.pullDownRefreshComplete()
      clearInterval(this.data.loadProcessTimeoutNum)
      this.setData({
        loadProgress:100
      })
      this.hideLoadProgress()
      this.handleSeatList(res.data.datas)

    }).catch(e => {
      console.log('座位信息获取出错：' + e)
      this.hideLoadProgress()
      this.pullDownRefreshComplete()
      this.toast('错误提示', e)
    })
  },

  hideLoadProgress() {
    this.setData({
      loadProgress: 0
    })
  },

  loadProgress() {
    var that = this
    var loadProcessTimeoutNum = setInterval(function(){
      if (that.data.loadProgress < 95){
        that.setData({
          loadProgress: that.data.loadProgress + 3
        })
      }
    }, 100)

    this.setData({
      loadProcessTimeoutNum: loadProcessTimeoutNum
    })
  },

  pullDownRefreshComplete() {
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this
    // let sIntervalNum = setInterval(function () {
    //   seat.listSeat().then(res => {
    //     that.handleSeatList(res.data.datas)

    //   }).catch(res => {
    //     console.log('座位信息获取出错：' + res)
    //   })
    // }, 5000)
    // this.setData({
    //   sIntervalNum: sIntervalNum
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.searchSeatList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})