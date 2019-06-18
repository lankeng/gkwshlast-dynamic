// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    xh: '',
    xb: '',
    bj: ''
  },
  tocostrecord:function(){
    wx.navigateTo({
      url: '/pages/costrecord/costrecord',
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '该功能尚未开启!',
    //   showCancel: false,
    //   confirmColor: '#004CA0',
    //   success: function(res) {
    //     if (res.confirm) {
    //       // console.log('用户点击确定')
    //     }
    //   }
    // })
  },
  toborrowban: function() {
    wx.navigateTo({
      url: '/pages/borrowban/borrowban',
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '该功能尚未开启!',
    //   showCancel: false,
    //   confirmColor: '#004CA0',
    //   success: function(res) {
    //     if (res.confirm) {
    //       // console.log('用户点击确定')
    //     }
    //   }
    // })
  },
  tologinban: function() {
    wx.navigateTo({
      url: '/pages/loginban/loginban',
    })
  },
  toroomban: function () {
    wx.navigateTo({
      url: '/pages/roomban/roomban',
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '该功能尚未开启!',
    //   showCancel: false,
    //   confirmColor: '#004CA0',
    //   success: function (res) {
    //     if (res.confirm) {
    //       // console.log('用户点击确定')
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  tolinkpage: function() {
    wx.showModal({
      title: '提示',
      content: '该功能尚未开启!',
      showCancel: false,
      confirmColor: '#004CA0',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        }
      }
    })
  },
  toaboutme: function() {
    wx.showModal({
      title: '提示',
      content: '该功能尚未开启!',
      showCancel: false,
      confirmColor: '#004CA0',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        }
      }
    })
  },
  onLoad: function(options) {

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
    var loginopenid = wx.getStorageSync('loginopenid')
    var userinfo = wx.getStorageSync('userinfo');
    if (loginopenid == true) {
      this.setData({
        name: userinfo.Data[0][0].XM,
        xh: userinfo.Data[0][0].XH,
        xb: userinfo.Data[0][0].ZYMC,
        bj: userinfo.Data[0][0].XZB
      })
    } else {
      this.setData({
        name: '',
        xh: '',
        xb: '',
        bj: ''
      })
    }
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