// components/custom-toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'ABC'
    },
    content: {
      type: String,
      value: 'EFD'
    },
    isShow:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideToast() {
      this.setData({
        isShow: false
      })
    }
  }
})
