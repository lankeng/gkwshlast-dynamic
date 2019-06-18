//app.js
App({
  onLaunch: function() {
    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    // if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
    wx.login({
      success: function(res) {
        if (res.code) {
          //console.log(res.code)
          // wx.getUserInfo({                    
          //   success:   function (res)  {                        
          //     var  objz = {};                        
          //     objz.avatarUrl = res.userInfo.avatarUrl;                        
          //     objz.nickName = res.userInfo.nickName; //// console.log(objz);          
          //     wx.setStorageSync('userInfo',  objz); //存储userInfo                    
          //   }                
          // });                
          var d = that.globalData; //这里存储了appid、secret、token串           ;                
          wx.request({
            url: 'https://dgnanbo.com:8001/api/Cost/Openids',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              code: res.code
            },
            // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
            // header: {}, // 设置请求的 header    
            success: function(res) {
              //console.log(res)
              var abc = {};
              // console.log(res)
              abc.openid = res.data.Openid;
              // obj.expires_in = Date.now() + res.data.expires_in; 
              // console.log(abc)
              wx.setStorageSync('openid', abc); //存储openid  
              wx.request({
                url: 'https://dgnanbo.com:8001/api/Data/BindingWeChatOpenID',
                method: 'POST',
                data: {
                  OPENID: abc.openid
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
                    // console.log(userpwd)
                    wx.setStorageSync('userpwd', userpwd)
                    wx.setStorageSync('userinfo', res.data)

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
                      success: function (res) {
                        //console.log(res.data)
                        if (res.data.Status == true) {
                          var roomban = true;
                          wx.setStorageSync('roomban', roomban)
                          var alldata = res.data.B_Lists[0]
                          var yuanqu = alldata.buildingNAME
                          var floor = alldata.dormitoryID
                          domitory = domitory.concat(yuanqu).concat(floor)
                          wx.setStorageSync('domitory', domitory)
                          //console.log(domitory)
                        } else {
                          var roomban = false;
                          wx.setStorageSync('roomban', roomban)
                        }
                      }
                    })
                  }
                }
              })           
            }
          });
        } else {
          // console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // }   
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})