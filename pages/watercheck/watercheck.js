var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: true,
    yuanqu:'',
    floor:'',
    starttime:'',
    endtime: '',
    byds: '',
    bysjyd: '',
    ceds: '',
    needtopay: '',
    free: '',
    paystatus: '',
    payxh: '',
    payxm: '',
    paytime: '',
  },
  notologin: function() {
    wx.navigateTo({
      url: '/pages/loginban/loginban',
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
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var year = date.getFullYear();
    //获取月份  
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    if(month == 1){
      year = year -1
      month = 12
    }else{
      month = (month - 1 < 10 ? '0' + (month - 1) : (month - 1))
    }
    var that = this
    var loginopenid = wx.getStorageSync('loginopenid')
    if (loginopenid == true) {
      if (that.data.login == false) {
        that.setData({
          login: true
        })
      }
      var roomban = wx.getStorageSync('roomban')
      console.log(roomban)
      if (roomban == '' || roomban == false) {
        wx.navigateTo({
          url: '/pages/roomban/roomban',
        })
      } else {
        var domitory = wx.getStorageSync('domitory')
        //console.log(domitory)
        var yuanqu = domitory[0]
        var floor = domitory[1]
        var ymdata = year + "-" + month
        console.log(ymdata, yuanqu, floor)
        wx.request({
          url: 'https://dgnanbo.com:8001/api/Cost/SelectNeedPayCost',
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            startTime: ymdata,
            buildingNAME: yuanqu,
            dormitoryID: floor
          },
          success:function(res){
            console.log(res.data)
            if (res.data.Status == true){
              var paystatus = ''
              if (res.data.P_Lists[0].payStatus == true){
                paystatus = '已缴费'
              }else{
                paystatus = '未缴费'
              }
              that.setData({
                yuanqu: res.data.P_Lists[0].buildingNAME,
                floor: res.data.P_Lists[0].dormitoryID,
                starttime: res.data.P_Lists[0].startTime,
                endtime: res.data.P_Lists[0].endTime,
                byds: res.data.P_Lists[0].byds,
                bysjyd: res.data.P_Lists[0].bysjyd,
                ceds: res.data.P_Lists[0].ceds,
                needtopay: res.data.P_Lists[0].needToPay,
                free: res.data.P_Lists[0].free,
                paystatus: paystatus,
                payxh: res.data.P_Lists[0].xh,
                payxm: res.data.P_Lists[0].payerName,
                paytime: res.data.P_Lists[0].payTime,
              })
            }else{
              that.setData({
                yuanqu: '',
                floor: '',
                starttime: '',
                endtime: '',
                byds: '',
                bysjyd: '',
                ceds: '',
                needtopay: '',
                free: '',
                paystatus: '',
                payxh: '',
                payxm: '',
                paytime: '',
              })
              wx.showModal({
                title: '提示',
                content: '查无数据！',
                showCancel: false,
                confirmColor: '#004CA0',
                success: function (res) {
                  if (res.confirm) {
                  }
                }
              })
            }
          }
        }) 
      }
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