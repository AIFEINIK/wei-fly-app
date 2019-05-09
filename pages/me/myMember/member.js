// pages/me/me.js
let card = require('../../../api/card.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.cardInfo){
            this.data.cardInfo = JSON.parse(options.cardInfo)

            switch(this.data.cardInfo.cardType){
                case 'WEEK':
                    this.data.cardInfo.img = 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg'
                    this.data.cardInfo.title = '周卡'
                    break
                case 'MONTH':
                    this.data.cardInfo.img = 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg'
                    this.data.cardInfo.title = '月卡'
                    break
                case 'QUARTER':
                    this.data.cardInfo.img = 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg'
                    this.data.cardInfo.title = '季卡'
                    break
                case 'YEAR':
                    this.data.cardInfo.img = 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg'
                    this.data.cardInfo.title = '年卡'
                    break
            }

            this.data.cardInfo.activeFlag = '未激活'
            if(this.data.cardInfo.active){
                this.data.cardInfo.activeFlag = '已激活'
            }

            this.setData({
                cardInfo: this.data.cardInfo
            })
        }

    },

    unbindCardTab() {
        this.confirmToast('消息提示', '确定要解绑吗？')
    },

    confirmToastOk() {
        card.unbindCard({cardCode: this.data.cardInfo.cardCode}).then(res => {
            this.setData({
                unbindCardToastShow: true
            })

        }).catch(e => {
                this.toast('消息提示', e)
        })
    },

    pageBack() {
        wx.navigateBack({
            delta: 1
        });
    },

    hideUnbindCardToast() {
        this.setData({
            unbindCardToastShow: false
        })
        wx.navigateBack({
            delta: 1
        });
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

    confirmToast: function (title, content) {
        this.setData({
            confirmToastTitle: title,
            confirmToastContent: content,
            confirmToastShow: true
        })
    },


    hideConfirmToast() {
        this.setData({
            confirmToastShow: false
        })
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