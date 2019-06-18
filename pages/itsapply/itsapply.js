// pages/proapply/proapply.js
var util = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  // getPhoneNumber(e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.iv)
  //   console.log(e.detail.encryptedData)
  // },
  data: {
    isAutonym: true,
    nowtime: '',
    date: '2018-10-01',
    time: '12:00',
    dateTime1: null,
    dateTimeArray1: null,
    startYear: '',
    endYear: 2050,
    description: '',
    requiretime: '',
    room: '',
    application: '',
    telnum: '',
    item1: '',
    yuanqu: '南苑',
    array: ['南苑', '博苑', '雅苑'],
    index: 0
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      yuanqu: this.data.array[e.detail.value]
    })
  },
  telnumipt: function(e) {
    var telnum = e.detail.value
    //console.log(telnum)
    this.setData({
      telnum
    })
  },
  applicationipt: function(e) {
    var application = e.detail.value
    //console.log(application)
    this.setData({
      application
    })
  },
  toroom: function(e) {
    var room = e.detail.value
    //console.log(room)
    this.setData({
      room
    })
  },
  descriptionipt: function(e) {
    var description = e.detail.value
    //console.log(description)
    this.setData({
      description
    })
  },
  chooseImageTap: function() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
      success: function(res) {
        console.log(res);
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function(type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        console.log(res.tempFilePaths[0]);
        _this.setData({
          item1: res.tempFilePaths[0],
          isAutonym: false
        })
      }
    })
  },
  toapply: function() {
    //获取所有填入信息
    var item1 = this.data.item1
    var description = this.data.description
    var nowtime = this.data.nowtime
    var room = this.data.room
    var application = this.data.application
    var telnum = this.data.telnum
    var yuanqu = this.data.yuanqu
    //console.log(item1, description, nowtime, seltime, room, application, telnum, yuanqu)
    //判断要求维修时间是否真实
    var myDate = new Date(); //获取系统当前时间
    var nowyear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var nowmonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var nowday = myDate.getDate(); //获取当前日(1-31)
    var nowhour = myDate.getHours(); //获取当前小时数(0-23)
    var nowmin = myDate.getMinutes(); //获取当前分钟数(0-59)
    if (nowmonth < 10) {
      nowmonth = '0' + nowmonth
    }
    if (nowday < 10) {
      nowday = '0' + nowday
    }
    if (nowhour < 10) {
      nowhour = '0' + nowhour
    }
    if (nowmin < 10) {
      nowmin = '0' + nowmin
    }
    //console.log(nowyear, nowmonth, nowday, nowhour, nowmin)
    var dateTimeArray1 = this.data.dateTimeArray1
    var dateTime1 = this.data.dateTime1
    //选择时间
    var selyear = dateTimeArray1[0][dateTime1[0]]
    var selmonth = dateTimeArray1[1][dateTime1[1]]
    var selday = dateTimeArray1[2][dateTime1[2]]
    var selhour = dateTimeArray1[3][dateTime1[3]]
    var selminute = dateTimeArray1[4][dateTime1[4]]
    var seltime = selyear + "-" + selmonth + "-" + selday + " " + selhour + ":" + selminute
    console.log(seltime)
    //console.log(dateTime1, dateTimeArray1)
    //判断是否存在空
    if (description != '' && room != '' && application != '' && telnum != '') {
      if (dateTimeArray1[0][dateTime1[0]] == nowyear) {
        if (dateTimeArray1[1][dateTime1[1]] < nowmonth) {
          wx.showModal({
            title: '提示',
            content: '维修时间不得在当前时间之前!',
            showCancel: false,
            confirmColor: '#EA986C',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          return false;
        } else {
          if (dateTimeArray1[1][dateTime1[1]] > nowmonth) {
            console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
            wx.showToast({
              title: '申请成功',
              icon: 'success',
              duration: 2000
            })
          }
          if (dateTimeArray1[1][dateTime1[1]] == nowmonth) {
            if (dateTimeArray1[2][dateTime1[2]] < nowday) {
              wx.showModal({
                title: '提示',
                content: '维修时间不得在当前时间之前!',
                showCancel: false,
                confirmColor: '#EA986C',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
              return false;
            } else {
              if (dateTimeArray1[2][dateTime1[2]] > nowday) {
                console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
                wx.showToast({
                  title: '申请成功',
                  icon: 'success',
                  duration: 2000
                })
              }
              if (dateTimeArray1[2][dateTime1[2]] == nowday) {
                if (dateTimeArray1[3][dateTime1[3]] < nowhour) {
                  wx.showModal({
                    title: '提示',
                    content: '维修时间不得在当前时间之前!',
                    showCancel: false,
                    confirmColor: '#EA986C',
                    success: function(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      }
                    }
                  })
                  return false;
                } else {
                  if (dateTimeArray1[3][dateTime1[3]] > nowhour) {
                    console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
                    wx.showToast({
                      title: '申请成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                  if (dateTimeArray1[3][dateTime1[3]] == nowhour) {
                    if (dateTimeArray1[4][dateTime1[4]] < nowmin) {
                      wx.showModal({
                        title: '提示',
                        content: '维修时间不得在当前时间之前!',
                        showCancel: false,
                        confirmColor: '#EA986C',
                        success: function(res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                          }
                        }
                      })
                      return false;
                    } else {
                      console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
                      wx.showToast({
                        title: '申请成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        console.log(item1, description, nowtime, seltime, room, application, telnum)
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 2000
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '必须填项不得为空!',
        showCancel: false,
        confirmColor: '#EA986C',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var myDate = new Date(); //获取系统当前时间
    var nowyear = myDate.getFullYear(); //获取当前年份(2位)
    this.setData({
      startYear: nowyear
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    var timesplit = time.split(' ')
    var timereplace = timesplit[0].replace(/\//g, '-')
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      nowtime: timereplace + ' ' + timesplit[1]
    });
    //console.log(time) 获取当前时间


    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

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