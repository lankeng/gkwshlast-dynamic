// pages/borrowban/borrowban.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zzshow: false,
    alphaData: null,
    username: '',
    password: ''
  },
  tologinban: function() {
    var usename = this.data.username
    var usepwd = this.data.password
    if (usename != '' && usepwd != '') {

    } else {
      wx.showModal({
        title: '提示',
        content: '图书证卡号密码不得为空！!',
        showCancel: false,
        confirmColor: '#004CA0',
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })
    }
  },
  onchange: function(e) {
    var name = e.currentTarget.dataset.name;
    if (name == 'username') {
      var username = e.detail.value
      this.setData({
        username
      })
      //console.log(this.data.username)
    }
    if (name == 'password') {
      var password = e.detail.value
      this.setData({
        password
      })
      //console.log(this.data.password)
    }
  },
  clickhelpshow: function() {
    this.setData({
      zzshow: true
    })
    var animation = wx.createAnimation({})
    animation.opacity(1).step({
      duration: 500
    })
    this.setData({
      alphaData: animation.export()
    })
  },
  clickhelphide: function() {
    var animation = wx.createAnimation({})
    animation.opacity(0).step({
      duration: 500
    })
    this.setData({
      alphaData: animation.export()
    })
    this.setData({
      zzshow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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