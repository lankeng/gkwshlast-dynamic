// pages/roomban/roomban.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['南苑', '博苑', '雅苑'],
    index: 0,
    login: true,
    xh: '',
    xm: '',
    yuanqu: '南苑',
    floor: '',
    bantext: '确认绑定',
    domitory: ''
  },
  toroomban: function() {
    var that = this
    //console.log(that.data.floor)
    var yuanqu = that.data.yuanqu
    var floor = that.data.floor
    var xh = that.data.xh
    var xm = that.data.xm
    var dormitory = []
    if (floor != '') {
      if (that.data.bantext == '确认绑定') {
        wx.request({
          url: 'https://dgnanbo.com:8001/api/Cost/BindingDormitory',
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            xh: xh,
            name: xm,
            buildingNAME: yuanqu,
            dormitoryID: floor
          },
          success: function(res) {
            console.log(res.data)
            if (res.data.Status == true) {
              // dormitory = dormitory.concat(xh).concat(xm).concat(yuanqu).concat(floor)
              // console.log(dormitory)
              // wx.setStorageSync('dormitory', dormitory)
              var roomban = true;
              wx.setStorageSync('roomban', roomban)
              that.setData({
                bantext: '已绑定（换绑）'
              })
              wx.showToast({
                title: '绑定宿舍成功',
                icon: 'success',
                duration: 1500
              })
              // console.log(res.data)
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1500)
            } else {
              var roomban = false;
              wx.setStorageSync('roomban', roomban)
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
      } else {
        wx.showModal({
          title: '提示',
          content: '换绑最多执行2次，您是否确认换绑？',
          confirmColor: '#004CA0',
          success(res) {
            if (res.confirm) {
              console.log(xh, xm, yuanqu, floor)
              wx.request({
                url: 'https://dgnanbo.com:8001/api/Cost/ExchangeBindingDormitory',
                method: 'GET',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data: {
                  xh: xh,
                  name: xm,
                  buildingNAME: yuanqu,
                  dormitoryID: floor
                },
                success: function(res) {
                  if (res.data.Status == true) {
                    wx.showToast({
                      title: '换绑宿舍成功',
                      icon: 'success',
                      duration: 1500
                    })
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }, 1500)
                  }
                }
              })
            }

          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '宿舍楼号不得为空！',
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
  floorshow: function(e) {
    var that = this
    that.setData({
      floor: e.detail.value
    })
  },
  notologin: function() {
    wx.navigateTo({
      url: '/pages/loginban/loginban',
    })
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      yuanqu: this.data.array[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var userinfo = wx.getStorageSync('userinfo');
    var xh = userinfo.Data[0][0].XH
    var domitory = []
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Cost/SelectStudentWhereDormitory',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        xh: xh
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.Status == true) {
          var roomban = true;
          wx.setStorageSync('roomban', roomban)
          var alldata = res.data.B_Lists[0]
          var yuanqu = alldata.buildingNAME
          var floor = alldata.dormitoryID
          domitory = domitory.concat(yuanqu).concat(floor)
          wx.setStorageSync('domitory', domitory)
          //console.log(domitory)
          if (yuanqu == '南苑') {
            that.setData({
              index: 0,
              floor: floor,
              bantext: '已绑定（换绑）'
            })
          }
          if (yuanqu == '博苑') {
            that.setData({
              index: 1,
              floor: floor,
              bantext: '已绑定（换绑）'
            })
          }
          if (yuanqu == '雅苑') {
            that.setData({
              index: 2,
              floor: floor,
              bantext: '已绑定（换绑）'
            })
          }
        } else {
          that.setData({
            index: 0,
            floor: '',
            bantext: '确认绑定'
          })
          var roomban = false;
          wx.setStorageSync('roomban', roomban)
        }
      }
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
    var that = this
    var loginopenid = wx.getStorageSync('loginopenid')
    if (loginopenid == true) {
      if (that.data.login == false) {
        that.setData({
          login: true
        })
      }
      var userinfo = wx.getStorageSync('userinfo');
      var xh = userinfo.Data[0][0].XH
      //console.log(userinfo)
      that.setData({
        xh: xh,
        xm: userinfo.Data[0][0].XM
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
    wx.reLaunch({
      url: '/pages/my/my'
    })
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