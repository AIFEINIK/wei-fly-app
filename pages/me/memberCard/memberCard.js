// pages/me/me.js
let card = require('../../../api/card.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardList: [{
            title: '周卡',
            type: 'WEEK',
            img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
            url: '/indexes/indexes',
            describe: '周卡使用详情介绍（使用规则、计费模式）'
        },
            {
                title: '月卡',
                type: 'MONTH',
                img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
                url: '/animation/animation',
                describe: '月卡使用详情介绍（使用规则、计费模式）'
            },
            {
                title: '季卡',
                type: 'QUARTER',
                img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
                url: '/drawer/drawer',
                describe: '月卡使用详情介绍（使用规则、计费模式）'
            },
            {
                title: '年卡',
                type: 'YEAR',
                img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
                url: '/verticalnav/verticalnav',
                describe: '月卡使用详情介绍（使用规则、计费模式）'
            }],
        numList: [{
            name: '领取'
        }, {
            name: '激活'
        }, {
            name: '使用'
        }],
        step_num: -1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    pageBack() {
        wx.navigateBack({
            delta: 1
        });
    },

    bindCard(o) {
        card.createCard({cardType: o.currentTarget.dataset.cardtype}).then(res => {
            this.setData({
                step_num: 0
            })
            wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 2000
            })

    }).
        catch(e => {
            this.toast('消息提示', e)
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        card.getCard().then(res => {
            this.data.step_num = 0
            if(res.data.active){
                this.data.step_num = 2
            }
            this.setData({
                step_num: this.data.step_num
            })

        }).catch(e => {
            console.log(e)
        })
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