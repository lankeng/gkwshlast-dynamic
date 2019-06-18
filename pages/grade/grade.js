// pages/grade/grade.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    array: [],
    index: 3,
    showdata: true
  },
  bindPickerChange(e) {
    wx.showLoading({
      title: '加载中',
    })
    var userinfo = wx.getStorageSync('userinfo')
    //console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var array = this.data.array
    var that = this
    //console.log(array[e.detail.value])
    var selyear = array[e.detail.value].substring(0, 9);
    var selmonth = array[e.detail.value].substring(13, 14);
    //console.log(selyear, selmonth)
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectStudentMark',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XH: userinfo.Data[0][0].XH,
        XN: selyear,
        XQ: selmonth
      },
      success: function(e) {
        wx.hideLoading()
        //console.log(e.data)
        if (e.data.Status == true) {
          //console.log(e.data.Data[0])
          that.setData({
            list: e.data.Data[0]
          })
          var list = e.data.Data[0]
          for (let i = 0; i < list.length; i++) {
            var name = 'list[' + i + '].open';
            that.setData({
              [name]: false
            });
          }
          //console.log(that.data.list)
        } else {
          that.setData({
            list: []
          })
          wx.showToast({
            title: '您还未有分数',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '网络连接错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  notologin: function() {
    wx.navigateTo({
      url: '/pages/loginban/loginban',
    })
  },
  /**
   * 收缩核心代码
   */
  kindToggle(e) {
    const id = e.currentTarget.id
    //console.log(id)
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].KCMC === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }

    /**
     * key和value名称一样时，可以省略
     * 
     * list:list=>list
     */
    this.setData({
      list
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
    var loginopenid = wx.getStorageSync('loginopenid')
    var myDate = new Date(); //获取系统当前时间
    var userinfo = wx.getStorageSync('userinfo')
    //console.log(userinfo)
    if (loginopenid == true) {
      if (this.data.showdata == false) {
        this.setData({
          showdata: true
        })
      }
      var NJ = userinfo.Data[0][0].DQSZJ
      var XZ = userinfo.Data[0][0].XZ
      var havelearnyear = []
      var nowyear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var nowmonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      havelearnyear = havelearnyear.concat(NJ)
      var between = nowyear - NJ
      //console.log(havelearnyear)
      for (var i = 1; i <= between; i++) {
        havelearnyear = havelearnyear.concat(NJ + i)
      }
      //console.log(havelearnyear)
      // var havelearnyeara = havelearnyear[0] + '-' + havelearnyear[1]
      // var havelearnyearb = havelearnyear[1] + '-' + havelearnyear[2]
      // var havelearnyearc = havelearnyear[2] + '-' + havelearnyear[3]
      // var havelearnyeard = havelearnyear[3] + '-' + havelearnyear[4]
      var havelearnyeara = []
      for (var k = 0; k < between; k++) {
        havelearnyeara = havelearnyeara.concat(havelearnyear[k] + '-' + havelearnyear[k + 1])
      }
      //console.log(havelearnyeara)
      var havelearnyearb = []
      for (var y = 0; y < between; y++) {
        havelearnyearb = havelearnyearb.concat(havelearnyeara[y] + '学年' + ' 第' + '1' + '学期')
        havelearnyearb = havelearnyearb.concat(havelearnyeara[y] + '学年' + ' 第' + '2' + '学期')
      }
      //console.log(havelearnyearb)
      this.setData({
        array: havelearnyearb
      })

      var nowxqnum, zhinian
      if (nowmonth < 9) {
        nowxqnum = 2
        var yearago = nowyear - 1
        zhinian = yearago + '-' + nowyear
      } else {
        nowxqnum = 1
        var yearnext = nowyear + 1
        zhinian = nowyear + '-' + yearnext
      }
      wx.showLoading({
        title: '加载中',
      })
      //console.log(zhinian, nowxqnum)
      for (var x = 0; x < havelearnyearb.length; x++) {
        var njsubstr = havelearnyearb[x].substring(0, 9);
        var xqsubstr = havelearnyearb[x].substring(13, 14);
        var that = this
        if (zhinian == njsubstr && nowxqnum == xqsubstr) {
          //console.log(x)
          that.setData({
            index: x
          })
          wx.request({
            url: 'https://dgnanbo.com:8001/api/Data/SelectStudentMark',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              XH: userinfo.Data[0][0].XH,
              XN: zhinian,
              XQ: nowxqnum
            },
            success: function(e) {
              wx.hideLoading()
              if (e.data.Status == true) {
                if (e.data.Data[0] != '') {
                  //console.log(e.data.Data[0])
                  that.setData({
                    list: e.data.Data[0]
                  })
                  var list = e.data.Data[0]
                  for (let i = 0; i < list.length; i++) {
                    var name = 'list[' + i + '].open';
                    that.setData({
                      [name]: false
                    });
                  }
                  //console.log(that.data.list)
                } else {
                  wx.showToast({
                    title: '您还未有分数',
                    icon: 'none',
                    duration: 2000
                  })
                }
              } else {
                wx.showToast({
                  title: '您还未有分数',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function(e) {
              wx.hideLoading()
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 2000
              })
            }
          })
          return false
        }
      }
    } else {
      this.setData({
        showdata: false
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