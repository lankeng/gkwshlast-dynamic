// pages/prodetail/prodetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: [],
    alldata: []
  },
  previewImg: function(e) {
    var index = e.currentTarget.dataset.src;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: index, //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var alldata = JSON.parse(options.alldata)
    //console.log(alldata)
    //console.log(alldata.imgs)
    var that = this
    var imgArr = that.data.imgArr.concat(alldata.imgs)
    that.setData({
      alldata: alldata,
      imgArr: imgArr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})