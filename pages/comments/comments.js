// pages/comments/comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['不满意', '基本满意', '满意', '非常满意'],
    arraya: ['不满意', '基本满意', '满意', '非常满意'],
    index: 3,
    indexa: 3,
    comment: '',
    situation: '',
    servicestatus: '',
    requireservicetime: '',
    sid: ''
  },
  commentsipt: function(e) {
    var comment = e.detail.value
    this.setData({
      comment
    })
  },
  bindPickerChange(e) {
    //console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangea(e) {
    //console.log(e.detail.value)
    this.setData({
      indexa: e.detail.value
    })
  },
  succomments: function() {
    var userinfo = wx.getStorageSync('userinfo')
    //console.log(userinfo)
    var xh = userinfo.Data[0][0].XH
    var sid = this.data.sid
    var comment = this.data.comment
    var index = this.data.index
    var indexa = this.data.indexa
    var array = this.data.array
    var arraya = this.data.arraya
    //console.log(array[index], arraya[indexa], comment)
    var that = this
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Service/UpdataPropertyInfo',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      }, // 设置请求的 header
      method: 'POST',
      data: {
        sid: sid,
        serviceAttitude: array[index],
        serviceQuality: arraya[indexa],
        suggestionOrSuggest: comment,
        xh: xh
      },
      success: res => {
        //console.log(res.data)
        if (res.data.Status == true) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)
        } else {
          wx.showToast({
            title: '提交出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sid = options.sid
    var situation = options.situation
    var servicestatus = options.servicestatus
    var requireservicetime = options.requireservicetime
    //console.log(sid, situation, servicestatus, requireservicetime)
    var that = this
    that.setData({
      situation: situation,
      servicestatus: servicestatus,
      requireservicetime: requireservicetime,
      sid: sid
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