// pages/pending/pending.js
var postsData = require('../../mockdata/order.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    pageIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      pageIndex: 1,
    })
    this.gainLoadingListData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("下拉刷新")
    let that = this;
    that.setData({
      pageIndex: 1, // 每次触发下拉事件pageIndex=0
    })
    that.gainLoadingListData()
  },
  gainLoadingListData() { 
    let that = this;
    let pageIndex = that.data.pageIndex;
    console.log("pageIndex == ", pageIndex);
    setTimeout(() => {
      this.setData({
        orderList: postsData.localList.slice(0, pageIndex*3)
      })
      wx.stopPullDownRefresh(); // 数据请求成功后，停止刷新
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("上拉加载")
    let that = this;
    that.setData({
      pageIndex: that.data.pageIndex + 1
    })
    that.gainLoadingListData() 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})