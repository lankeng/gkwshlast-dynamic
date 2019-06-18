// pages/classdetail/classdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    classroom: '',
    weeknum: '',
    timenum: '',
    teacher: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var item = JSON.parse(options.item);
    //console.log(item)
    //console.log(item.all.DSZ)
    if (item.all.DSZ == ' ') {
      if (item.all.QSZ == item.all.JSZ) {
        var weeknum = item.all.QSZ + '周'
      } else {
        var weeknum = item.all.QSZ + "-" + item.all.JSZ + '周'
      }
    }
    if (item.all.DSZ == '单') {
      var weeknum = item.all.QSZ + "-" + item.all.JSZ + '周(单周)'
    }
    if (item.all.DSZ == '双') {
      var weeknum = item.all.QSZ + "-" + item.all.JSZ + '周(双周)'
    }
    var xqj = item.all.XQJ
    var zj
    if (xqj == 1) {
      zj = '星期一'
    }
    if (xqj == 2) {
      zj = '星期二'
    }
    if (xqj == 3) {
      zj = '星期三'
    }
    if (xqj == 4) {
      zj = '星期四'
    }
    if (xqj == 5) {
      zj = '星期五'
    }
    var djj = item.all.DJJ
    var skcd = item.all.SKCD
    var js = djj + skcd - 1
    var timenum = zj + ' ' + item.all.DJJ + '~' + js + '节'
    that.setData({
      title: item.couname,
      teacher: item.techer,
      classroom: item.room,
      weeknum: weeknum,
      timenum: timenum
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