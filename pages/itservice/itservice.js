// pages/property/property.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datashow: [],
    login: true,
  },
  notologin: function () {
    wx.navigateTo({
      url: '/pages/loginban/loginban',
    })
  },
  gocomments: function(e) {
    var sid = e.currentTarget.dataset.sid
    var situation = e.currentTarget.dataset.situation
    var servicestatus = e.currentTarget.dataset.servicestatus
    var requireservicetime = e.currentTarget.dataset.requireservicetime
    //console.log(sid)
    wx.navigateTo({
      url: '/pages/comments/comments?sid=' + sid + '&situation=' + situation + '&servicestatus=' + servicestatus + '&requireservicetime=' + requireservicetime,
    })
  },
  goprodetail: function(e) {
    var alldata = e.currentTarget.dataset.alldata
    //console.log(alldata)
    wx.navigateTo({
      url: '/pages/prodetail/prodetail?alldata=' + JSON.stringify(alldata),
    })
  },
  toapply: function(e) {
    //console.log(e.currentTarget.dataset.type)
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/proapply/proapply?type=' + type,
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
    var that = this
    var loginopenid = wx.getStorageSync('loginopenid')
    if (loginopenid == true) {
      if (that.data.login == false) {
        that.setData({
          login: true
        })
      }
      var userinfo = wx.getStorageSync('userinfo')
      //console.log(userinfo)
      var xh = userinfo.Data[0][0].XH
      wx.request({
        url: 'https://dgnanbo.com:8001/api/Service/SelectUserPropertyInfo',
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          type: "2",
          xh: xh
        },
        success: res => {
          //console.log(res.data)
          if (res.data.Status == true) {
            var datashow = res.data.Lists
            for (var i = 0; i < datashow.length; i++) {
              if (datashow[i].serviceStatus == "0") {
                datashow[i].serviceStatus = "等待维修"
              }
              if (datashow[i].serviceStatus == "1") {
                datashow[i].serviceStatus = "已维修"
              }
              if (datashow[i].serviceStatus == "2") {
                datashow[i].serviceStatus = "已评价"
              }
            }
            that.setData({
              datashow: res.data.Lists
            })
            //console.log(datashow)
          }
        }
      })
    } else {
      that.setData({
        login: false
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