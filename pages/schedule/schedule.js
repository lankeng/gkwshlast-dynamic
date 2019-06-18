var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorshow: true,
    array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    nowarray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    nowweek: 0,
    arrayyear: [],
    indexyear: 0,
    month: '',
    login: true,
    course: [{
        link: [{
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          }
        ]
      },
      {
        link: [{
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          }
        ]
      },
      {
        link: [{
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          }
        ]
      },
      {
        link: [{
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          }
        ]
      },
      {
        link: [{
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          },
          {
            couname: '',
            techer: '',
            room: ''
          }
        ]
      }
    ],
    week: 0,
    xn: '',
    xq: '',
    // 自定义自己喜欢的颜色
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"
    ],
    // 存储随机颜色
    randomColorArr: [],
    loginopenid: false,
    nowdayweek:''
  },
  toclassdetail(e) {
    var item = e.currentTarget.dataset.item
    if (item.couname != '') {
      // console.log(item)
      wx.navigateTo({
        url: '/pages/classdetail/classdetail?item=' + JSON.stringify(item)
      })
    }
  },
  bindPickerChangea(e) {
    wx.showLoading({
      title: '加载中',
    })
    var userinfo = wx.getStorageSync('userinfo')
    //// console.log(e.detail.value)
    this.setData({
      indexyear: e.detail.value
    })
    var array = this.data.arrayyear
    var that = this
    // console.log(array[e.detail.value])
    var selyear = array[e.detail.value].substring(0, 9);
    var selmonth = array[e.detail.value].substring(13, 14);
    // console.log(selyear, selmonth)
    that.setData({
      xn: selyear,
      xq: selmonth
    })
    var nj = userinfo.Data[0][0].DQSZJ
    var selnj = array[e.detail.value].substring(0, 4);
    // console.log(selnj)
    var selxq = array[e.detail.value].substring(13, 14);
    if (selnj == nj && selxq == 1) {
      that.setData({
        week: 5
      })
    } else {
      that.setData({
        week: 0
      })
    }
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XH: userinfo.Data[0][0].XH,
        XN: selyear,
        XQ: selmonth,
        ZS: that.data.array[that.data.week]
      },
      success: function(e) {
        wx.hideLoading()
        if (e.data.Status == true) {
          var showdata = e.data.Data[0]
          //console.log(showdata)
          var course = that.data.course
          for (var y = 0; y < course.length; y++) {
            for (var z = 0; z < course[y].link.length; z++) {
              var changecounamea = 'course[' + y + '].link[' + z + '].couname';
              var changetechera = 'course[' + y + '].link[' + z + '].techer';
              var changerooma = 'course[' + y + '].link[' + z + '].room';
              that.setData({
                [changecounamea]: '',
                [changetechera]: '',
                [changerooma]: '',
                [changeran]: ''
              })
            }
          }
          for (var i = 0; i < showdata.length; i++) {
            var weekday = showdata[i].XQJ - 1
            var daytime = showdata[i].DJJ / 2 + 0.5 - 1
            // console.log(daytime)
            var classdata = showdata[i].KCB.split('/')
            //  console.log(classdata)
            var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
            var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
            var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
            var ran = Math.floor(Math.random() * 20);
            var changeran = 'course[' + daytime + '].link[' + weekday + '].ran';
            var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
            that.setData({
              [changecouname]: classdata[0],
              [changetecher]: classdata[1],
              [changeroom]: classdata[2],
              [changeran]: ran,
              [changeall]: showdata[i]
            });
          }
           //console.log(that.data.course)
        } else {
          var course = that.data.course
          for (var y = 0; y < course.length; y++) {
            for (var z = 0; z < course[y].link.length; z++) {
              var changecounamea = 'course[' + y + '].link[' + z + '].couname';
              var changetechera = 'course[' + y + '].link[' + z + '].techer';
              var changerooma = 'course[' + y + '].link[' + z + '].room';
              that.setData({
                [changecounamea]: '',
                [changetechera]: '',
                [changerooma]: '',
                [changeran]: ''
              })
            }
          }
          wx.showModal({
            title: '提示',
            content: '您这星期没课喔(⊙o⊙)!',
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
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: '网络连接错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  bindPickerChangeb(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var myDate = new Date(); //获取系统当前时间
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      nowweek: e.detail.value,
      week: e.detail.value
    })
    var nowweek = []
    nowweek = nowweek.concat(e.detail.value)
    nowweek = nowweek.concat(new Date())
    wx.setStorageSync('nowweek', nowweek)

    //设置后标题改变
    //计算设置当前周数后课表
    var storyweek = nowweek
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
      var titleweeka = that.data.nowarray[titleweek]
      that.setData({
        week: titleweek
      })
    } else {
      var titleweeka = 1
      // console.log(titleweek)
      that.setData({
        week: 0
      })
    }
    wx.setNavigationBarTitle({
      title: '课程表（第' + titleweeka + '周）'
    })


    //  let time = util.formatTime(new Date());
    //  let date = util.getDates(7, time);//当前周
    // console.log(new Date())
    // let nowtime = util.formatDate(new Date());//当前日期时间
    // console.log(nowtime)
    // var start_date = new Date(date[0].time.replace(/-/g, "/"));
    // var end_date = new Date(date[4].time.replace(/-/g, "/"));
    // console.log(start_date, end_date)
    // var nextweek = start_date + 7 * (1000 * 60 * 60 * 24)
    // console.log(nextweek)
    var userinfo = wx.getStorageSync('userinfo')
    var xn = that.data.xn
    var xq = that.data.xq
    var arraynum = that.data.array[e.detail.value]
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XH: userinfo.Data[0][0].XH,
        XN: xn,
        XQ: xq,
        ZS: that.data.array[e.detail.value]
      },
      success: function(e) {
        wx.hideLoading()
        // console.log(e.data)
        if (e.data.Status == true) {
          wx.setNavigationBarTitle({
            title: '课程表（第' + arraynum + '周）'
          })
          var course = that.data.course
          for (var y = 0; y < course.length; y++) {
            for (var z = 0; z < course[y].link.length; z++) {
              var changecounamea = 'course[' + y + '].link[' + z + '].couname';
              var changetechera = 'course[' + y + '].link[' + z + '].techer';
              var changerooma = 'course[' + y + '].link[' + z + '].room';
              that.setData({
                [changecounamea]: '',
                [changetechera]: '',
                [changerooma]: ''
              })
            }
          }
          var showdata = e.data.Data[0]
          // console.log(showdata)
          for (var i = 0; i < showdata.length; i++) {
            var weekday = showdata[i].XQJ - 1
            var daytime = showdata[i].DJJ / 2 + 0.5 - 1
            // console.log(daytime)
            var classdata = showdata[i].KCB.split('/')
            // console.log(classdata)
            var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
            var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
            var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
            var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
            var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
            that.setData({
              [changecouname]: classdata[0],
              [changetecher]: classdata[1],
              [changeroom]: classdata[2],
              [changeall]: showdata[i]
            });
          }
        } else {
          var course = that.data.course
          for (var y = 0; y < course.length; y++) {
            for (var z = 0; z < course[y].link.length; z++) {
              var changecounamea = 'course[' + y + '].link[' + z + '].couname';
              var changetechera = 'course[' + y + '].link[' + z + '].techer';
              var changerooma = 'course[' + y + '].link[' + z + '].room';
              that.setData({
                [changecounamea]: '',
                [changetechera]: '',
                [changerooma]: ''
              })
            }
          }
          wx.showModal({
            title: '提示',
            content: '您这星期没课喔(⊙o⊙)!',
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

  //下一周
  nexttoweek() {
    var that = this
    var week = that.data.week
    var userinfo = wx.getStorageSync('userinfo')
    var xn = that.data.xn
    var xq = that.data.xq
    var array = that.data.array
    week = parseInt(week) + 1
    //console.log(week)
    if (week < 20) {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true,
      });
      that.setData({
        week: week
      })
      wx.request({
        url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          XH: userinfo.Data[0][0].XH,
          XN: xn,
          XQ: xq,
          ZS: array[week]
        },
        success: function (e) {
          wx.hideToast()
          // console.log(e.data)
          if (e.data.Status == true) {
            var course = that.data.course
            for (var y = 0; y < course.length; y++) {
              for (var z = 0; z < course[y].link.length; z++) {
                var changecounamea = 'course[' + y + '].link[' + z + '].couname';
                var changetechera = 'course[' + y + '].link[' + z + '].techer';
                var changerooma = 'course[' + y + '].link[' + z + '].room';
                that.setData({
                  [changecounamea]: '',
                  [changetechera]: '',
                  [changerooma]: ''
                })
              }
            }
            var showdata = e.data.Data[0]
            // console.log(showdata)
            for (var i = 0; i < showdata.length; i++) {
              var weekday = showdata[i].XQJ - 1
              var daytime = showdata[i].DJJ / 2 + 0.5 - 1
              // console.log(daytime)
              var classdata = showdata[i].KCB.split('/')
              //  console.log(classdata)
              var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
              var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
              var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
              var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
              var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
              that.setData({
                [changecouname]: classdata[0],
                [changetecher]: classdata[1],
                [changeroom]: classdata[2],
                [changeall]: showdata[i]
              });
            }
          } else {
            var course = that.data.course
            for (var y = 0; y < course.length; y++) {
              for (var z = 0; z < course[y].link.length; z++) {
                var changecounamea = 'course[' + y + '].link[' + z + '].couname';
                var changetechera = 'course[' + y + '].link[' + z + '].techer';
                var changerooma = 'course[' + y + '].link[' + z + '].room';
                that.setData({
                  [changecounamea]: '',
                  [changetechera]: '',
                  [changerooma]: ''
                })
              }
            }
            wx.showModal({
              title: '提示',
              content: '您这星期没课喔(⊙o⊙)!',
              showCancel: false,
              confirmColor: '#004CA0',
              success: function (res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail: function () {
          wx.hideToast()
          wx.showToast({
            title: '网络连接错误',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      return false
    }
  },

  //上一周
  beforeweek: function () {
    var that = this
    var week = that.data.week
    var userinfo = wx.getStorageSync('userinfo')
    var xn = that.data.xn
    var xq = that.data.xq
    var array = that.data.array
    week = week - 1
    if (week >= 0) {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true,
      });
      that.setData({
        week: week
      })
      wx.request({
        url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          XH: userinfo.Data[0][0].XH,
          XN: xn,
          XQ: xq,
          ZS: array[week]
        },
        success: function (e) {
          wx.hideToast()
          // console.log(e.data)
          if (e.data.Status == true) {
            var course = that.data.course
            for (var y = 0; y < course.length; y++) {
              for (var z = 0; z < course[y].link.length; z++) {
                var changecounamea = 'course[' + y + '].link[' + z + '].couname';
                var changetechera = 'course[' + y + '].link[' + z + '].techer';
                var changerooma = 'course[' + y + '].link[' + z + '].room';
                that.setData({
                  [changecounamea]: '',
                  [changetechera]: '',
                  [changerooma]: ''
                })
              }
            }
            var showdata = e.data.Data[0]
            // console.log(showdata)
            for (var i = 0; i < showdata.length; i++) {
              var weekday = showdata[i].XQJ - 1
              var daytime = showdata[i].DJJ / 2 + 0.5 - 1
              // console.log(daytime)
              var classdata = showdata[i].KCB.split('/')
              //  console.log(classdata)
              var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
              var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
              var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
              var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
              var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
              that.setData({
                [changecouname]: classdata[0],
                [changetecher]: classdata[1],
                [changeroom]: classdata[2],
                [changeall]: showdata[i]
              });
            }
          } else {
            var course = that.data.course
            for (var y = 0; y < course.length; y++) {
              for (var z = 0; z < course[y].link.length; z++) {
                var changecounamea = 'course[' + y + '].link[' + z + '].couname';
                var changetechera = 'course[' + y + '].link[' + z + '].techer';
                var changerooma = 'course[' + y + '].link[' + z + '].room';
                that.setData({
                  [changecounamea]: '',
                  [changetechera]: '',
                  [changerooma]: ''
                })
              }
            }
            wx.showModal({
              title: '提示',
              content: '您这星期没课喔(⊙o⊙)!',
              showCancel: false,
              confirmColor: '#004CA0',
              success: function (res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail: function () {
          wx.hideToast()
          wx.showToast({
            title: '网络连接错误',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      return false
    }
  },

  //选择周数
  bindPickerChange(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    // console.log(that.data.xn, that.data.xq)
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var xn = that.data.xn
    var xq = that.data.xq
    var array = that.data.array
    var userinfo = wx.getStorageSync('userinfo')
    that.setData({
      week: e.detail.value
    })
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XH: userinfo.Data[0][0].XH,
        XN: xn,
        XQ: xq,
        ZS: array[e.detail.value]
      },
      success: function(e) {
        wx.hideLoading()
        // console.log(e.data)
        if (e.data.Status == true) {
          var course = that.data.course
          for (var y = 0; y < course.length; y++) {
            for (var z = 0; z < course[y].link.length; z++) {
              var changecounamea = 'course[' + y + '].link[' + z + '].couname';
              var changetechera = 'course[' + y + '].link[' + z + '].techer';
              var changerooma = 'course[' + y + '].link[' + z + '].room';
              that.setData({
                [changecounamea]: '',
                [changetechera]: '',
                [changerooma]: ''
              })
            }
          }
          var showdata = e.data.Data[0]
          // console.log(showdata)
          for (var i = 0; i < showdata.length; i++) {
            var weekday = showdata[i].XQJ - 1
            var daytime = showdata[i].DJJ / 2 + 0.5 - 1
            // console.log(daytime)
            var classdata = showdata[i].KCB.split('/')
            //  console.log(classdata)
            var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
            var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
            var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
            var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
            var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
            that.setData({
              [changecouname]: classdata[0],
              [changetecher]: classdata[1],
              [changeroom]: classdata[2],
              [changeall]: showdata[i]
            });
          }
        } else {
          var course = that.data.course
          for (var y = 0; y < course.length; y++) {
            for (var z = 0; z < course[y].link.length; z++) {
              var changecounamea = 'course[' + y + '].link[' + z + '].couname';
              var changetechera = 'course[' + y + '].link[' + z + '].techer';
              var changerooma = 'course[' + y + '].link[' + z + '].room';
              that.setData({
                [changecounamea]: '',
                [changetechera]: '',
                [changerooma]: ''
              })
            }
          }
          wx.showModal({
            title: '提示',
            content: '您这星期没课喔(⊙o⊙)!',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var M = date.getMonth() + 1;
    // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // console.log(M,D)
    var that = this;
    that.setData({
      month: M
    })

    let labLen = 20,
      colorArr = that.data.colorArr,
      colorLen = colorArr.length,
      randomColorArr = [];
    //判断执行
    do {
      let random = colorArr[Math.floor(Math.random() * colorLen)];
      randomColorArr.push(random);
      labLen--;
    } while (labLen > 0)

    that.setData({
      randomColorArr: randomColorArr
    });
    //计算当前星期几
    var nowweekend = util.formatDate(new Date());
    var weekdata = util.getDates(7, nowweekend);
    // console.log(weekdata)
    that.setData({
      nowdayweek:weekdata[0].week
    })
    //console.log(that.data.nowdayweek)
    wx.setStorageSync('nowdayweek', weekdata[0].week)

    //onshow
    var loginopenid = wx.getStorageSync('loginopenid')
    var myDate = new Date(); //获取系统当前时间
    var userinfo = wx.getStorageSync('userinfo')
    var that = this
    //var loginopenid = that.data.loginopenid
    if (loginopenid == true) {
      if (that.data.login == false) {
        that.setData({
          login: true
        })
      }
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
        var titleweeka = that.data.nowarray[titleweek]
        that.setData({
          week: titleweek
        })
      } else {
        var titleweeka = 1
        // console.log(titleweek)
        that.setData({
          week: 0
        })
      }
      wx.setNavigationBarTitle({
        title: '课程表（第' + titleweeka + '周）'
      })


      var xh = userinfo.Data[0][0].XH
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
      // console.log(havelearnyear)
      // var havelearnyeara = havelearnyear[0] + '-' + havelearnyear[1]
      // var havelearnyearb = havelearnyear[1] + '-' + havelearnyear[2]
      // var havelearnyearc = havelearnyear[2] + '-' + havelearnyear[3]
      // var havelearnyeard = havelearnyear[3] + '-' + havelearnyear[4]
      var havelearnyeara = []
      for (var k = 0; k < between; k++) {
        havelearnyeara = havelearnyeara.concat(havelearnyear[k] + '-' + havelearnyear[k + 1])
      }
      // console.log(havelearnyeara)
      var havelearnyearb = []
      for (var y = 0; y < between; y++) {
        havelearnyearb = havelearnyearb.concat(havelearnyeara[y] + '学年' + ' 第' + '1' + '学期')
        havelearnyearb = havelearnyearb.concat(havelearnyeara[y] + '学年' + ' 第' + '2' + '学期')
      }
      // console.log(havelearnyearb)
      that.setData({
        arrayyear: havelearnyearb
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
      that.setData({
        xn: zhinian,
        xq: nowxqnum
      })
      // if (nowyear == NJ) {
      //   that.setData({
      //     week: 5
      //   })
      // }
      if (nowyear == NJ && nowxqnum == 1) {
        that.setData({
          week: 5
        })
      } 

      for (var x = 0; x < havelearnyearb.length; x++) {
        var njsubstr = havelearnyearb[x].substring(0, 9);
        var xqsubstr = havelearnyearb[x].substring(13, 14);
        var that = this
        if (zhinian == njsubstr && nowxqnum == xqsubstr) {
          that.setData({
            indexyear: x
          })
          wx.request({
            url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              XH: userinfo.Data[0][0].XH,
              XN: zhinian,
              XQ: nowxqnum,
              ZS: that.data.array[that.data.week]
            },
            success: function(e) {
              wx.hideLoading()
              // console.log(e.data)
              if (e.data.Status == true) {
                var course = that.data.course
                for (var y = 0; y < course.length; y++) {
                  for (var z = 0; z < course[y].link.length; z++) {
                    var changecounamea = 'course[' + y + '].link[' + z + '].couname';
                    var changetechera = 'course[' + y + '].link[' + z + '].techer';
                    var changerooma = 'course[' + y + '].link[' + z + '].room';
                    that.setData({
                      [changecounamea]: '',
                      [changetechera]: '',
                      [changerooma]: ''
                    })
                  }
                }
                var showdata = e.data.Data[0]
                // console.log(showdata)
                for (var i = 0; i < showdata.length; i++) {
                  var weekday = showdata[i].XQJ - 1
                  var daytime = showdata[i].DJJ / 2 + 0.5 - 1
                  // console.log(daytime)
                  var classdata = showdata[i].KCB.split('/')
                  // console.log(classdata)
                  var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
                  var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
                  var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
                  var ran = Math.floor(Math.random() * 20);
                  var changeran = 'course[' + daytime + '].link[' + weekday + '].ran';
                  var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
                  that.setData({
                    [changecouname]: classdata[0],
                    [changetecher]: classdata[1],
                    [changeroom]: classdata[2],
                    [changeran]: ran,
                    [changeall]: showdata[i]
                  });
                }
              } else {
                wx.showModal({
                  title: '提示',
                  content: '您这星期没课喔(⊙o⊙)!',
                  showCancel: false,
                  confirmColor: '#004CA0',
                  success: function(res) {
                    if (res.confirm) {
                      // console.log('用户点击确定')
                    }
                  }
                })
                var course = that.data.course
                for (var y = 0; y < course.length; y++) {
                  for (var z = 0; z < course[y].link.length; z++) {
                    var changecounamea = 'course[' + y + '].link[' + z + '].couname';
                    var changetechera = 'course[' + y + '].link[' + z + '].techer';
                    var changerooma = 'course[' + y + '].link[' + z + '].room';
                    that.setData({
                      [changecounamea]: '',
                      [changetechera]: '',
                      [changerooma]: ''
                    })
                  }
                }
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
          return false
        }
      }


    } else {
      that.setData({
        login: false
      })
      var course = that.data.course
      for (var y = 0; y < course.length; y++) {
        for (var z = 0; z < course[y].link.length; z++) {
          var changecounamea = 'course[' + y + '].link[' + z + '].couname';
          var changetechera = 'course[' + y + '].link[' + z + '].techer';
          var changerooma = 'course[' + y + '].link[' + z + '].room';
          that.setData({
            [changecounamea]: '',
            [changetechera]: '',
            [changerooma]: ''
          })
        }
      }
      wx.setNavigationBarTitle({
        title: '课程表'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  notologin: function() {
    wx.navigateTo({
      url: '/pages/loginban/loginban',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var loginopenid = wx.getStorageSync('loginopenid')
    // // var that = this
    // // if (that.data.loginopenid != loginopenid){
    // //   that.setData({
    // //     loginopenid: loginopenid
    // //   })
    // //   this.onLoad()
    // // }


    // var myDate = new Date(); //获取系统当前时间
    // var userinfo = wx.getStorageSync('userinfo')
    // var that = this
    // // var loginopenid = that.data.loginopenid
    // if (loginopenid == true) {
    //   if (that.data.login == false) {
    //     that.setData({
    //       login: true
    //     })
    //   }
    //   //计算设置当前周数后课表
    //   var storyweek = wx.getStorageSync('nowweek')
    //   console.log(storyweek)
    //   if (storyweek != '') {
    //     let time = util.formatTime(new Date(storyweek[1]));
    //     let date = util.getDates(7, time); //当前周
    //     // console.log(wx.getStorageSync('nowweek'))
    //     // console.log(time, date)
    //     var timestamp = Date.parse(new Date(storyweek[1])); //时间戳
    //     timestamp = timestamp / 1000;
    //     var nowtimestamp = new Date();
    //     var storystamp = new Date(storyweek[1]);
    //     var setweek = parseInt(storyweek[0])
    //     // console.log(storyweek[0])
    //     if (date[0].week == '周一') {
    //       var xcdays = nowtimestamp.getTime() - storystamp.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(day)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     if (date[0].week == '周二') {
    //       var mondaystamp = timestamp - 24 * 60 * 60
    //       var n_to = mondaystamp * 1000
    //       var monday = new Date(n_to);
    //       // console.log(monday)
    //       //nowtimestamp = nowtimestamp / 1000;
    //       var xcdays = nowtimestamp.getTime() - monday.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       // console.log(setweek, day)
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(computeday)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     if (date[0].week == '周三') {
    //       var mondaystamp = timestamp - 2 * 24 * 60 * 60
    //       var n_to = mondaystamp * 1000
    //       var monday = new Date(n_to);
    //       // console.log(monday)
    //       //nowtimestamp = nowtimestamp / 1000;
    //       var xcdays = nowtimestamp.getTime() - monday.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       // console.log(setweek, day)
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(computeday)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     if (date[0].week == '周四') {
    //       var mondaystamp = timestamp - 3 * 24 * 60 * 60
    //       var n_to = mondaystamp * 1000
    //       var monday = new Date(n_to);
    //       // console.log(monday)
    //       //nowtimestamp = nowtimestamp / 1000;
    //       var xcdays = nowtimestamp.getTime() - monday.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       // console.log(setweek, day)
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(computeday)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     if (date[0].week == '周五') {
    //       var mondaystamp = timestamp - 4 * 24 * 60 * 60
    //       var n_to = mondaystamp * 1000
    //       var monday = new Date(n_to);
    //       // console.log(monday)
    //       //nowtimestamp = nowtimestamp / 1000;
    //       var xcdays = nowtimestamp.getTime() - monday.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       // console.log(setweek, day)
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(computeday)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     if (date[0].week == '周六') {
    //       var mondaystamp = timestamp - 5 * 24 * 60 * 60
    //       var n_to = mondaystamp * 1000
    //       var monday = new Date(n_to);
    //       // console.log(monday)
    //       //nowtimestamp = nowtimestamp / 1000;
    //       var xcdays = nowtimestamp.getTime() - monday.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       // console.log(setweek, day)
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(computeday)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     if (date[0].week == '周日') {
    //       var mondaystamp = timestamp - 6 * 24 * 60 * 60
    //       var n_to = mondaystamp * 1000
    //       var monday = new Date(n_to);
    //       // console.log(monday)
    //       //nowtimestamp = nowtimestamp / 1000;
    //       var xcdays = nowtimestamp.getTime() - monday.getTime()
    //       var day = parseInt(xcdays / (1000 * 60 * 60 * 24)) + 1;
    //       // console.log(setweek, day)
    //       var computeday = setweek + parseInt(day / 7)
    //       // console.log(computeday)
    //       wx.setStorageSync('computeweek', computeday)
    //     }
    //     var titleweek = wx.getStorageSync('computeweek')
    //     console.log(titleweek)
    //     var titleweeka = that.data.nowarray[titleweek]
    //     that.setData({
    //       week: titleweek
    //     })
    //   } else {
    //     var titleweeka = 1
    //     // console.log(titleweek)
    //     that.setData({
    //       week: 0
    //     })
    //   }

    //   console.log(titleweek)
    //   //if (titleweek!=undefined&&titleweek != that.data.week) {
    //     wx.setNavigationBarTitle({
    //       title: '课程表（第' + titleweeka + '周）'
    //     })


    //     var xh = userinfo.Data[0][0].XH
    //     var NJ = userinfo.Data[0][0].DQSZJ
    //     var XZ = userinfo.Data[0][0].XZ
    //     var havelearnyear = []
    //     var nowyear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    //     var nowmonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    //     havelearnyear = havelearnyear.concat(NJ)
    //     var between = nowyear - NJ
    //     //console.log(havelearnyear)
    //     for (var i = 1; i <= between; i++) {
    //       havelearnyear = havelearnyear.concat(NJ + i)
    //     }
    //     // console.log(havelearnyear)
    //     // var havelearnyeara = havelearnyear[0] + '-' + havelearnyear[1]
    //     // var havelearnyearb = havelearnyear[1] + '-' + havelearnyear[2]
    //     // var havelearnyearc = havelearnyear[2] + '-' + havelearnyear[3]
    //     // var havelearnyeard = havelearnyear[3] + '-' + havelearnyear[4]
    //     var havelearnyeara = []
    //     for (var k = 0; k < between; k++) {
    //       havelearnyeara = havelearnyeara.concat(havelearnyear[k] + '-' + havelearnyear[k + 1])
    //     }
    //     // console.log(havelearnyeara)
    //     var havelearnyearb = []
    //     for (var y = 0; y < between; y++) {
    //       havelearnyearb = havelearnyearb.concat(havelearnyeara[y] + '学年' + ' 第' + '1' + '学期')
    //       havelearnyearb = havelearnyearb.concat(havelearnyeara[y] + '学年' + ' 第' + '2' + '学期')
    //     }
    //     // console.log(havelearnyearb)
    //     that.setData({
    //       arrayyear: havelearnyearb
    //     })
    //     var nowxqnum, zhinian
    //     if (nowmonth < 9) {
    //       nowxqnum = 2
    //       var yearago = nowyear - 1
    //       zhinian = yearago + '-' + nowyear
    //     } else {
    //       nowxqnum = 1
    //       var yearnext = nowyear + 1
    //       zhinian = nowyear + '-' + yearnext
    //     }
    //     that.setData({
    //       xn: zhinian,
    //       xq: nowxqnum
    //     })
    //     // if (nowyear == NJ) {
    //     //   that.setData({
    //     //     week: 5
    //     //   })
    //     // }
    //     for (var x = 0; x < havelearnyearb.length; x++) {
    //       var njsubstr = havelearnyearb[x].substring(0, 9);
    //       var xqsubstr = havelearnyearb[x].substring(13, 14);
    //       var that = this
    //       if (zhinian == njsubstr && nowxqnum == xqsubstr) {
    //         that.setData({
    //           indexyear: x
    //         })
    //         wx.request({
    //           url: 'https://dgnanbo.com:8001/api/Data/SelectStudentDetailedClass',
    //           method: 'GET',
    //           header: {
    //             'content-type': 'application/json' // 默认值
    //           },
    //           data: {
    //             XH: userinfo.Data[0][0].XH,
    //             XN: zhinian,
    //             XQ: nowxqnum,
    //             ZS: that.data.array[that.data.week]
    //           },
    //           success: function (e) {
    //             // console.log(e.data)
    //             if (e.data.Status == true) {
    //               var course = that.data.course
    //               for (var y = 0; y < course.length; y++) {
    //                 for (var z = 0; z < course[y].link.length; z++) {
    //                   var changecounamea = 'course[' + y + '].link[' + z + '].couname';
    //                   var changetechera = 'course[' + y + '].link[' + z + '].techer';
    //                   var changerooma = 'course[' + y + '].link[' + z + '].room';
    //                   that.setData({
    //                     [changecounamea]: '',
    //                     [changetechera]: '',
    //                     [changerooma]: ''
    //                   })
    //                 }
    //               }
    //               var showdata = e.data.Data[0]
    //               // console.log(showdata)
    //               for (var i = 0; i < showdata.length; i++) {
    //                 var weekday = showdata[i].XQJ - 1
    //                 var daytime = showdata[i].DJJ / 2 + 0.5 - 1
    //                 // console.log(daytime)
    //                 var classdata = showdata[i].KCB.split('/')
    //                 // console.log(classdata)
    //                 var changecouname = 'course[' + daytime + '].link[' + weekday + '].couname';
    //                 var changetecher = 'course[' + daytime + '].link[' + weekday + '].techer';
    //                 var changeroom = 'course[' + daytime + '].link[' + weekday + '].room';
    //                 var ran = Math.floor(Math.random() * 20);
    //                 var changeran = 'course[' + daytime + '].link[' + weekday + '].ran';
    //                 var changeall = 'course[' + daytime + '].link[' + weekday + '].all';
    //                 that.setData({
    //                   [changecouname]: classdata[0],
    //                   [changetecher]: classdata[1],
    //                   [changeroom]: classdata[2],
    //                   [changeran]: ran,
    //                   [changeall]: showdata[i]
    //                 });
    //               }
    //             } else {
    //               wx.showModal({
    //                 title: '提示',
    //                 content: '您这星期没课喔(⊙o⊙)!',
    //                 showCancel: false,
    //                 confirmColor: '#EA986C',
    //                 success: function (res) {
    //                   if (res.confirm) {
    //                     // console.log('用户点击确定')
    //                   }
    //                 }
    //               })
    //               var course = that.data.course
    //               for (var y = 0; y < course.length; y++) {
    //                 for (var z = 0; z < course[y].link.length; z++) {
    //                   var changecounamea = 'course[' + y + '].link[' + z + '].couname';
    //                   var changetechera = 'course[' + y + '].link[' + z + '].techer';
    //                   var changerooma = 'course[' + y + '].link[' + z + '].room';
    //                   that.setData({
    //                     [changecounamea]: '',
    //                     [changetechera]: '',
    //                     [changerooma]: ''
    //                   })
    //                 }
    //               }
    //             }
    //           }
    //         })
    //         return false
    //       }
    //     }
    //  // }

    // } else {
    //   that.setData({
    //     login: false
    //   })
    //   var course = that.data.course
    //   for (var y = 0; y < course.length; y++) {
    //     for (var z = 0; z < course[y].link.length; z++) {
    //       var changecounamea = 'course[' + y + '].link[' + z + '].couname';
    //       var changetechera = 'course[' + y + '].link[' + z + '].techer';
    //       var changerooma = 'course[' + y + '].link[' + z + '].room';
    //       that.setData({
    //         [changecounamea]: '',
    //         [changetechera]: '',
    //         [changerooma]: ''
    //       })
    //     }
    //   }
    //   wx.setNavigationBarTitle({
    //     title: '课程表'
    //   })
    // }
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