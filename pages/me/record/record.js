let record = require('../../../api/record.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      recordForm:{
        pageNum: 1,
        pageSize: 5
      },
      recordCount:0,
      recordList:[],
      canNextLoad:true,  //是否可以加载下一页数据
      CustomBar: app.globalData.CustomBar,
      loadProgress: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.recordList()

    },

    recordList() {
      record.listRecord(this.data.recordForm).then(res => {
        if (res.data.total < this.data.recordForm.pageSize) {
          this.setData({
            canNextLoad: false
          })
        }
        this.setData({
          recordCount: res.data.total,
          recordList: res.data.datas
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉刷新记录信息')
    this.setData({
      recordForm: {
        pageNum: 1,
        pageSize: 5
      }
    })

    wx.showNavigationBarLoading()
    this.loadProgress()
    record.listRecord(this.data.recordForm).then(res => {
      if (res.data.total <= this.data.pageNum){
        this.setData({
          canNextLoad:false
        })
      }
      this.pullDownRefreshComplete()
      this.loadProcessComplete()
      this.setData({
        recordCount: res.data.total,
        recordList: res.data.datas
      })

    }).catch(e => {
      this.loadProcessComplete()
      this.pullDownRefreshComplete()
      this.toast('消息提示', e)
    })
  },

  loadProcessComplete() {
    clearInterval(this.data.loadProcessTimeoutNum)
    this.setData({
      loadProgress: 0
    })
  },

  loadProgress() {
    var that = this
    var loadProcessTimeoutNum = setInterval(function () {
      if (that.data.loadProgress < 95) {
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
    console.log('消费记录触底事件')
    if(this.data.canNextLoad){
      var tmp_pageNum = this.data.recordForm.pageNum + 1
      var pageTotal = this.data.recordCount / this.data.recordForm.pageSize;
      if (this.data.recordCount % this.data.recordForm.pageSize > 0) {
        pageTotal++;
      }
      if (tmp_pageNum > pageTotal) {
        this.setData({
          recordLoadVisible: true,
          isLoad: false,
          canNextLoad: false
        })
        
      } else {
        this.setData({
          recordLoadVisible: true,
          isLoad: true,
          recordForm: {
            pageSize: 5,
            pageNum: tmp_pageNum
          },
        })

        record.listRecord(this.data.recordForm).then(res => {
          this.setData({
            recordLoadVisible: false,
            recordCount: res.data.total,
            recordList: this.data.recordList.concat(res.data.datas)
          })

        }).catch(e => {
          this.setData({
            recordLoadVisible: false,
          })
          console.log('消费记录查询出错：' + e)
        }) 
      }
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
      this.setData({
        recordForm: {
          pageNum: 1,
          pageSize: 5
        }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})