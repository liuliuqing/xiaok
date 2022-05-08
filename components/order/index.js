// component/order/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: Object,
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
    onTap() {
      // this.triggerEvent('booktap', {
      //   nid: this.properties.order.nid
      // }, {})
      wx.navigateTo({
        url: '/pages/mission/mission?nid='+this.properties.order.nid,
      })
    }
  }
})
