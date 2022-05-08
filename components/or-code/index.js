
// let drawQrcode = require("../../utils/weapp.qrcode.js");
let drawQrcode = require("../../utils/weapp.qrcode.js");
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  ready() {
    console.log('ddddd')
    this.getQRcode()
    // drawQrcode({
    //   width: 200,
    //   height: 200,
    //   canvasId: 'myQrcode',
    //   background:'#ffffff',
    //   foreground: '#000000',
    //   text: 'https://github.com/yingye',
    //   image: {
    //     imageResource: '',
    //     dx: 70,
    //     dy: 70,
    //     dWidth: 60,
    //     dHeight: 60
    //   },
    //   _this: this
    // })
  },
  methods: {
    getQRcode() {
      drawQrcode({
        width: 150,
        height: 150,
        canvasId: 'myQrcode',
        background:'#fff',
        foreground: '#000000',
        text: 'https://codesign.qq.com/app/design/BGAE9KbEQVjlRd8/2nL6jgD22W9pJXV/inspect',
        // correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
        image: {
          imageResource: '',
          dx: 70,
          dy: 70,
          dWidth: 60,
          dHeight: 60
        },
        _this: this
      })
    },
  }
})
