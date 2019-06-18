var util = require('../../utils/util.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/bannerc.jpg',
      '/image/bannera.jpg',
      '/image/bannerb.jpg'
    ],
    openid: ''
  },
  topaymoney:function(){
    wx.navigateTo({
      url: '/pages/paymoney/paymoney',
    })
  },
  toelewater: function() {
    wx.showModal({
      title: '提示',
      content: '该功能尚未开启!',
      showCancel: false,
      confirmColor: '#EA986C',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        }
      }
    })
    // wx.navigateTo({
    //   url: '/pages/watercheck/watercheck',
    // })
  },
  tocourier: function() {
    wx.navigateTo({
      url: '/pages/courier/courier',
    })
  },
  toproperty: function() {
    wx.navigateTo({
      url: '/pages/property/property',
    })
  },
  toclass: function() {
    wx.navigateTo({
      url: '/pages/schedule/schedule',
    })
  },
  tofindbook: function() {
    wx.navigateTo({
      url: '/pages/findbook/findbook',
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
  toit: function() {
    wx.navigateTo({
      url: '/pages/itservice/itservice',
    })
  },
  tograde: function() {
    wx.navigateTo({
      url: '/pages/grade/grade',
    })
  },
  toborrowinfo: function() {
    wx.navigateTo({
      url: '/pages/borrowinfo/borrowinfo',
    })
    // wx.showModal({
    //   title: '提示',
    //   content: '该功能尚未开启!',
    //   showCancel: false,
    //   confirmColor: '#004CA0',
    //   success: function(res) {
    //     if (res.confirm) {
    //       //console.log('用户点击确定')
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this
    // wx.login({
    //   success: function(res) {
    //     if (res.code) {
    //       // wx.getUserInfo({                    
    //       //   success:   function (res)  {                        
    //       //     var  objz = {};                        
    //       //     objz.avatarUrl = res.userInfo.avatarUrl;                        
    //       //     objz.nickName = res.userInfo.nickName; //console.log(objz);          
    //       //     wx.setStorageSync('userInfo',  objz); //存储userInfo                    
    //       //   }                
    //       // });                
    //       var d = that.globalData; //这里存储了appid、secret、token串           ;                
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxbddd7a02303d6e58&secret=a09ed1c5f25ab1485c0aa49a92e1747f&js_code=' + res.code + '&grant_type=authorization_code',
    //         data: {},
    //         method: 'GET',
    //         // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
    //         // header: {}, // 设置请求的 header    
    //         success: function(res) {
    //           var abc = {};
    //           //console.log(res)
    //           abc.openid = res.data.openid;
    //           // obj.expires_in = Date.now() + res.data.expires_in; 
    //           //console.log(abc)
    //           wx.setStorageSync('openid', abc); //存储openid             
    //         },
    //         fail: function() {
    //           wx.showToast({
    //             title: '网络连接错误',
    //             icon: 'none',
    //             duration: 2000
    //           })
    //         }
    //       });
    //     } else {
    //       //console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
    
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
    // var that = this;
    // var a = wx.getStorageSync('user')
    // console.log(a)
    //console.log(wx.getStorageSync('openid'))
    var openid = wx.getStorageSync('openid').openid
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/BindingWeChatOpenID',
      method: 'POST',
      data: {
        OPENID: openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        //console.log(res.data)
        if (res.data.Status == false) {
          var loginopenid = false
          wx.setStorageSync('loginopenid', loginopenid)
        } else {
          var loginopenid = true
          wx.setStorageSync('loginopenid', loginopenid)
          var userpwd = [],
            userpwd = userpwd.concat(res.data.ZHMM[0].XH).concat(res.data.ZHMM[0].MM)
          //console.log(userpwd)
          wx.setStorageSync('userpwd', userpwd)
          wx.setStorageSync('userinfo', res.data)
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络连接错误',
          icon: 'none',
          duration: 2000
        })
      }
    })

    //计算当前星期几
    var nowweekend = util.formatDate(new Date());
    var weekdata = util.getDates(7, nowweekend);
    //console.log(that.data.nowdayweek)
    wx.setStorageSync('nowdayweek', weekdata[0].week)
    //计算设置当前周数后课表
    var storyweek = wx.getStorageSync('nowweek')
    //console.log(storyweek)
    if (storyweek != '') {
      let time = util.formatTime(new Date(storyweek[1]));
      let date = util.getDates(7, time); //当前周
      // console.log(wx.getStorageSync('nowweek'))
      //console.log(time, date)
      var timestamp = Date.parse(new Date(storyweek[1])); //时间戳
      timestamp = timestamp / 1000;
      var nowtimestamp = new Date();
      var storystamp = new Date(storyweek[1]);
      var setweek = parseInt(storyweek[0])
      // console.log(storyweek[0])
      if (date[0].week == '周一') {
        var xcdays = nowtimestamp.getTime() - storystamp.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        var computeday = setweek + parseInt(day / 7)
        // console.log(day)
        wx.setStorageSync('computeweek', computeday)
      }
      if (date[0].week == '周二') {
        var mondaystamp = timestamp - 24 * 60 * 60
        var n_to = mondaystamp * 1000
        var monday = new Date(n_to);
        // console.log(monday)
        //nowtimestamp = nowtimestamp / 1000;
        var xcdays = nowtimestamp.getTime() - monday.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        // console.log(setweek, day)
        var computeday = setweek + parseInt(day / 7)
        // console.log(computeday)
        wx.setStorageSync('computeweek', computeday)
      }
      if (date[0].week == '周三') {
        var mondaystamp = timestamp - 2 * 24 * 60 * 60
        var n_to = mondaystamp * 1000
        var monday = new Date(n_to);
        // console.log(monday)
        //nowtimestamp = nowtimestamp / 1000;
        var xcdays = nowtimestamp.getTime() - monday.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        // console.log(setweek, day)
        var computeday = setweek + parseInt(day / 7)
        // console.log(computeday)
        wx.setStorageSync('computeweek', computeday)
      }
      if (date[0].week == '周四') {
        var mondaystamp = timestamp - 3 * 24 * 60 * 60
        var n_to = mondaystamp * 1000
        var monday = new Date(n_to);
        // console.log(monday)
        //nowtimestamp = nowtimestamp / 1000;
        var xcdays = nowtimestamp.getTime() - monday.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        // console.log(setweek, day)
        var computeday = setweek + parseInt(day / 7)
        // console.log(computeday)
        wx.setStorageSync('computeweek', computeday)
      }
      if (date[0].week == '周五') {
        var mondaystamp = timestamp - 4 * 24 * 60 * 60
        var n_to = mondaystamp * 1000
        var monday = new Date(n_to);
        // console.log(monday)
        //nowtimestamp = nowtimestamp / 1000;
        var xcdays = nowtimestamp.getTime() - monday.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        // console.log(setweek, day)
        var computeday = setweek + parseInt(day / 7)
        // console.log(computeday)
        wx.setStorageSync('computeweek', computeday)
      }
      if (date[0].week == '周六') {
        var mondaystamp = timestamp - 5 * 24 * 60 * 60
        var n_to = mondaystamp * 1000
        var monday = new Date(n_to);
        // console.log(monday)
        //nowtimestamp = nowtimestamp / 1000;
        var xcdays = nowtimestamp.getTime() - monday.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        // console.log(setweek, day)
        var computeday = setweek + parseInt(day / 7)
        // console.log(computeday)
        wx.setStorageSync('computeweek', computeday)
      }
      if (date[0].week == '周日') {
        var mondaystamp = timestamp - 6 * 24 * 60 * 60
        var n_to = mondaystamp * 1000
        var monday = new Date(n_to);
        // console.log(monday)
        //nowtimestamp = nowtimestamp / 1000;
        var xcdays = nowtimestamp.getTime() - monday.getTime()
        var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
        // console.log(setweek, day)
        var computeday = setweek + parseInt(day / 7)
        // console.log(computeday)
        wx.setStorageSync('computeweek', computeday)
      }
      var titleweek = wx.getStorageSync('computeweek')
      //console.log(titleweek)
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