//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    length: 0,
    pwd_eye: false,
    showPwd: false,
    usename: '',
    usepwd: '',
    userpwd: [],
    btntext: '绑定(更新/换绑)'
  },
  tologinban: function() {
    //openid
    var usename = this.data.usename
    var usepwd = this.data.usepwd
    var that = this
    var openid = wx.getStorageSync('openid').openid
    // console.log(wx.getStorageSync('loginopenid'))
    var loginopenid = wx.getStorageSync('loginopenid')
    if (usename != '' && usepwd != '') {
      if (loginopenid == false) {
        wx.request({
          url: 'https://dgnanbo.com:8001/api/Data/BindingWeChat',
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            XH: usename,
            SFZH: usepwd,
            OPENID: openid
          },
          success: res => {
            // console.log(res.data)
            if (res.data.Status == true) {
              var userpwd = that.data.userpwd.concat(usename).concat(usepwd)
              // console.log(userpwd)
              wx.setStorageSync('userpwd', userpwd)
              wx.setStorageSync('userinfo', res.data)
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 1500
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1500)
            } else {
              wx.showModal({
                title: '提示',
                content: '账号密码错误！',
                showCancel: false,
                confirmColor: '#004CA0',
                success: function(res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                  }
                }
              })
              return false
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '您是否确认解除绑定',
          confirmColor: '#004CA0',
          success(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              var openid = wx.getStorageSync('openid').openid
              wx.request({
                url: 'https://dgnanbo.com:8001/api/Data/RelieveWeChat',
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data: {
                  OPENID: openid
                },
                success: res => {
                  if (res.data.Status == true) {
                    wx.showToast({
                      title: '解绑成功',
                      icon: 'success',
                      duration: 2000
                    })
                    // console.log(res.data)
                    setTimeout(function() {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }, 1500)
                  } else {
                    wx.showToast({
                      title: '解绑失败',
                      icon: 'none',
                      duration: 2000
                    })
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                }
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '账号密码不得为空！',
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
  onLoad: function() {
    // console.log(wx.getStorageSync('openid').openid)
  },
  onShow: function() {
    // console.log(wx.getStorageSync('openid').openid)


    // console.log(wx.getStorageSync('loginopenid'))
    var loginopenid = wx.getStorageSync('loginopenid')
    var user = wx.getStorageSync('userpwd');
    var userinfo = wx.getStorageSync('userinfo');
    if (loginopenid == true) {

      // console.log(user)
      // console.log(userinfo)
      this.setData({
        usename: user[0],
        usepwd: user[1],
        btntext: '已绑定(解除绑定)'
      })
    }
  },
  onTap: function(e) {
    this.setData({
      tap: e.currentTarget.dataset.name,
      pwd_eye: false
    })
    if (e.currentTarget.dataset.name == 'username') {
      this.getPosition(this.data.length);
    } else {
      this.setData({
        styles: {},
        pwd_eye: true
      })
    }
  },
  onChange: function(e) {
    // console.log(e.currentTarget.dataset.name)
    var name = e.currentTarget.dataset.name;
    if (name == 'username') {
      this.data.length = e.detail.cursor;
      this.getPosition(e.detail.cursor);
      var usename = e.detail.value
      this.setData({
        usename
      })
      // console.log(this.data.usename)
    }
    if (name == 'password') {
      var usepwd = e.detail.value
      this.setData({
        usepwd
      })
      // console.log(this.data.usepwd)
    }
  },
  clickPwdEye: function() {
    this.setData({
      showPwd: !this.data.showPwd,
      tap: 'password',
      styles: {}
    })
  },
  getPosition: function(length) {
    var face = parseFloat(1.5 / 36 * length);
    var nose = parseFloat(1 / 36 * length);
    var left_eye = parseFloat(1.5 / 36 * length);
    var right_eye = parseFloat(2 / 36 * length);
    var left_ear = parseFloat(1 / 36 * length);
    var right_ear = parseFloat(1 / 36 * length);
    var doe = false;
    var styles = {};
    styles.face = `left:${1 + (face > 1.5 ? 1.5 : face)}em`;
    styles.nose = `left:${0.9 + (nose > 1 ? 1 : nose)}em`;
    styles.left_eye = `left:${0.5 + (left_eye > 1.5 ? 1.5 : left_eye)}em`;
    styles.right_eye = `left:${4 + (right_eye > 2 ? 2 : right_eye)}em`;
    styles.left_ear = `left:${1.5 - (left_ear > 1 ? 1 : left_ear)}em`;
    styles.right_ear = `left:${7.5 - (right_ear > 1 ? 1 : right_ear)}em`;
    if (length >= 6) {
      doe = true;
    }
    this.setData({
      styles: styles,
      doe: doe
    })
  }
})