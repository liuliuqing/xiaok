// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    xxx: {},
    num: 0
  },
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad() {
    // wx.showLoading({
    //   title: '定位中',
    //   mask: true,
    // });
    wx.startLocationUpdateBackground({
      success:(res)=>{
          wx.onLocationChange((data)=>{  //获取实时的定位信息
            console.log('success',data)
            this.setData({xxx: data})
          })
      },
      fail:(err)=>{
        wx.showModal({    //引导用户授权
              content: '提示语文本.....',
              confirmText: "确认",
              cancelText: "取消",
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if(res.authSetting["scope.userLocationBackground"] == true){
                        wx.onLocationChange((data)=>{
                          this.setData({xxx: data})
                        })
                      }
                      }
                  })
                } else {
                  wx.showToast({
                    title: "取消授权~",
                    icon: 'none',
                  })
                }
              }
        })
      }
  })
  },
  onHide(){
    wx.stopLocationUpdate()
    wx.offLocationChange()
  },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
  /**
   * 拨打电话 
   */
  callTel(){
    wx.makePhoneCall({
      phoneNumber: '15889675843'
    })
  },
  /**
   * 获取用户登录手机号 
   */
  getPhoneNumber (e) {
    console.log(e.detail)
  },
  /**
   * 弹框
   */
  callShowToast() {
    wx.showToast({
      title: '定位失败',
      icon: 'none',
      duration: 1500
    })
    // wx.hideLoading({});
  },
  callShowBox(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 查看地图 
   */
  callMap(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度,获取当前位置
      success (res) {
        const latitude = Number(res.latitude)
        const longitude = res.longitude
        // console.log(latitude, longitude)
        // index.js? [sm]:71 23.02882 113.14278
        wx.openLocation({
          latitude,
          longitude,
          // // name,
          address: '广东省佛山市高明区荷城街道高明大道东889 号A2门',
          scale: 18
        })
      }
     })
  },
  /**
   * 当前位置与目标位置距离
   */
  callGoMap(){
    let latitude2 = 116.403119
    let l2 = 39.913607
    let num = this.dis(latitude2,l2,this.data.xxx.latitude,this.data.xxx.longitude)
    console.log(num)
    this.setData({num})
  },
  // 计算两地之间的距离
  dis(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
  },
  /**
   * 扫码
   */
  scanCodeEvent() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res){
        console.log("扫码成功："+JSON.stringify(res))
      }
    })
  },
  /**
   * 上传照片
   */
  chooseMediaEvent() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        console.log(res.tempFiles[0].size)
      }
    })
  },
  showMediaEvent(){
    let bannerArr = [{
        "url": "http://test-qiniuyun.sdjmm.net/7b06f276-7422-469d-bb2d-9e10901e2bb3",
    }]
    if (wx.canIUse('previewMedia')) {
      wx.previewMedia({
        sources: bannerArr,
        current: 0,
      })
    }
  }
})
