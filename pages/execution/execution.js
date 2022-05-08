// pages/pending/pending.js
var postsData = require('../../mockdata/order.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sizeType: ['original', 'compressed'], //	原图/压缩上传
    sourceType: ['album', 'camera'], //相册,或拍照
    // max-size限制5M
    files: [
      {url: 'http://tmp/yROO8hhrKjhu0d0e8f5bb075293c560a930b73f20f39.jpg'},
      {url: 'http://tmp/yROO8hhrKjhu0d0e8f5bb075293c560a930b73f20f39.jpg', error: true},
      {url: 'http://tmp/yROO8hhrKjhu0d0e8f5bb075293c560a930b73f20f39.jpg', loading: true},
    ],
    imagesurl: [], // 上传图片进度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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
  // https://blog.csdn.net/weixin_46671666/article/details/118614080
  // 在upLoadPhoto方法中是先调用后端的专门上传图片的接口地址，把所选图片都上传完成之后再调用发布信息的接口，把已经上传好的图片同文案内容等信息一起发布即可，所以在这里后端是做了两个接口去实现。
  upLoadPhoto(i, length) {    
    wx.uploadFile({    
      //后端提供的，单指上传图片到服务器的接口地址
      url: 'https://www.jswzl.xyz/comment/uploadFile',      
      filePath: this.data.files[i],      
      name: 'file',
      // 图片上传成功后服务器返回图片地址，我们前端接收并拼接
      success: (res) => {
        console.log('上传图片成功：', JSON.parse(res.data));        
        var data = JSON.parse(res.data);     
        // 把获取到的路径存入imagesurl字符串中         
        this.setData({          
          imagesurl: this.data.imagesurl.concat(data.data+',')        
        })        
        console.log(this.data.imagesurl)      
      },      
      fail: (res) => {},      
      complete: () => {        
        i++;    
        //判断选择的本地图片是否已经全部上传到服务器，如果i==length则表示已完成 
        if (i == length) { 
          console.log("上传成功");
          // 图片全部上传好就用后端给的发布信息的接口地址去发布请求，同前面那个接口地址不同，前面那个是专门用于上传图片的，这个是用于发布信息的
          wx.request({
            url: 'https://www.jswzl.xyz/Trends/add',
            method:'POST',
            data:{
              content:"阳阳帅",//文案内容
              profess:'true',
              uid:71,
              pictrue: this.data.imagesurl,//要上传的多张图片
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
             },
          })
        }
        // 所选的本地图片还没有全部上传成功
        else { 
          //递归调用upLoadPhoto函数   
          console.log("上传第"+i-1+"张");       
          this.upLoadPhoto( i, length);        
        }      
      },    
    });  
  },
  submitSub(){
    console.log(this.data.files);
    let that=this;
    let i=0;
    let length=that.data.files.length;
    // that.upLoadPhoto(i, length);
  }
})


    