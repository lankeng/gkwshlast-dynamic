// pages/findbook/findbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    iptvalue: '',
    showclose: false
  },
  getvalue: function(e) {
    var name = e.detail.value
    //console.log(name)
    this.setData({
      name: name
    })
    if (name != '') {
      this.setData({
        showclose: true
      })
    } else {
      this.setData({
        showclose: false
      })
    }
  },
  tosearch: function() {
    var name = this.data.name
    //console.log(name);
    if (name == '') {
      wx.showModal({
        title: '提示',
        content: '输入不能为空!',
        showCancel: false,
        confirmColor: '#004CA0',
        success: function(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/showbook/showbook',
      })
    }
  },
  toclear: function() {
    this.setData({
      name: '',
      iptvalue: '',
      showclose: false
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