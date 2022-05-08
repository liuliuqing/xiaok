
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["扫码签收", "手动签收"],
    tabUnderlineColor: '#d93d3c', // 选中选项卡下划线颜色
    tabActiveTextColor: '#000000', // 选中选项卡字体颜色
    tabInactiveTextColor: '#000000', // 未选中选项卡字体颜色
    tabBackgroundColor: '#ffffff', // 选项卡背景颜色
    activeTab: 0, // 当前激活tab
    duration: 500, // 内容区域切换时长
    swiperHeight: '',


    sizeType: ['original', 'compressed'], //	原图/压缩上传
    sourceType: ['album', 'camera'], //相册,或拍照
    // max-size限制5M
    files: [
      {url: 'http://tmp/yROO8hhrKjhu0d0e8f5bb075293c560a930b73f20f39.jpg'},
      {url: 'http://tmp/yROO8hhrKjhu0d0e8f5bb075293c560a930b73f20f39.jpg', error: true},
      {url: 'http://tmp/3bxn0rRFoiqXde814030333601495f9a9af4c7a71a97.jpg', loading: true},
    ],
    imagesurl: [], // 上传图片进度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getHeight('swiper-box')
  },

  handleTabClick(e) {
    const index = e.currentTarget.dataset.index
    this.setData({activeTab: index})
  },

  handleSwiperChange(e) {
    const index = e.detail.current
    this.setData({activeTab: index})
  },

  getHeight(str, type) {
    let query = wx.createSelectorQuery();
    let that = this;
    query.select('.' + str).boundingClientRect(function (rect) {
      const style = type ? `height: 100vh;` : `height: ${rect.height + 80}px`
      that.setData({
          swiperHeight: style
      })
    }).exec();
  },


  /**
   * 
   */
  previewImage: function(e) {
    this.getHeight('swiper-box', true)
    console.log('dadsadad',e.detail.index)
    wx.previewImage({
      current: this.data.files[e.detail.index].url, // 当前显示图片的http链接
      urls: e.detail.previewImageUrls, // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    // console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    const that = this;
    return new Promise((resolve, reject)=>{
      const {tempFilePaths} = files;
      that.setData({
          filesUrl: tempFilePaths,
          // files: that.data.files.concat(list)
       })
      let object ={};
      object['urls']= tempFilePaths;
      resolve(object);
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
    const that = this;
    const {urls} = e.detail;
    let list = []
    urls.forEach(item=>{
      list.push({url: item})
    })
    that.setData({
      files: that.data.files.concat(list)
    })
     console.log(that.data.files)
  },
  deleteAllFile(){
    this.data.files.splice(0,this.data.files.length)
    this.setData({
      files: []
    })
  },
  deleteImg(e){
    this.data.files.splice(this.data.files.findIndex(item => item == e.detail.item), 1)
    console.log(this.data.files);
  },
})