// pages/proapply/proapply.js
var util = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  // getPhoneNumber(e) {
  //    console.log(e.detail.errMsg)
  //    console.log(e.detail.iv)
  //    console.log(e.detail.encryptedData)
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
    index: 0,
    type: '',
    btnshow:true
  },
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      yuanqu: this.data.array[e.detail.value]
    })
  },
  telnumipt: function(e) {
    var telnum = e.detail.value
    // console.log(telnum)
    this.setData({
      telnum
    })

    //判断按钮是否可按
    var description = this.data.description
    var room = this.data.room
    var application = this.data.application
    var telnum = this.data.telnum
    var item1 = this.data.item1
    if (description != '' && room != '' && application != '' && telnum != '' && item1 != '') {
      this.setData({
        btnshow: false
      })
    } else {
      this.setData({
        btnshow: true
      })
    }
  },
  applicationipt: function(e) {
    var application = e.detail.value
    // console.log(application)
    this.setData({
      application
    })

    //判断按钮是否可按
    var description = this.data.description
    var room = this.data.room
    var application = this.data.application
    var telnum = this.data.telnum
    var item1 = this.data.item1
    if (description != '' && room != '' && application != '' && telnum != '' && item1 != '') {
      this.setData({
        btnshow: false
      })
    } else {
      this.setData({
        btnshow: true
      })
    }
  },
  toroom: function(e) {
    var room = e.detail.value
    // console.log(room)
    this.setData({
      room
    })
    //判断按钮是否可按
    var description = this.data.description
    var room = this.data.room
    var application = this.data.application
    var telnum = this.data.telnum
    var item1 = this.data.item1
    if (description != '' && room != '' && application != '' && telnum != '' && item1 != '') {
      this.setData({
        btnshow: false
      })
    } else {
      this.setData({
        btnshow: true
      })
    }
  },
  descriptionipt: function(e) {
    var description = e.detail.value
    // console.log(description)
    this.setData({
      description
    })
    //判断按钮是否可按
    var description = this.data.description
    var room = this.data.room
    var application = this.data.application
    var telnum = this.data.telnum
    var item1 = this.data.item1
    if (description != '' && room != '' && application != '' && telnum != '' && item1 != '') {
      this.setData({
        btnshow: false
      })
    }else{
      this.setData({
        btnshow: true
      })
    }
  },
  chooseImageTap: function() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
      success: function(res) {
        // console.log(res);
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
        // console.log(res);
        _this.setData({
          item1: res.tempFilePaths[0],
          isAutonym: false
        })

        //判断按钮是否可按
        var description = _this.data.description
        var room = _this.data.room
        var application = _this.data.application
        var telnum = _this.data.telnum
        var item1 = _this.data.item1
        if (description != '' && room != '' && application != '' && telnum != '' &&item1!='') {
          _this.setData({
            btnshow: false
          })
        } else {
          _this.setData({
            btnshow: true
          })
        }
      }
    })
  },
  toapply: function() {
    //获取所有填入信息
    var userinfo = wx.getStorageSync('userinfo')
    // console.log(userinfo.Data[0][0].XH)
    var xh = userinfo.Data[0][0].XH
    var item1 = this.data.item1
    var description = this.data.description
    var nowtime = this.data.nowtime
    var room = this.data.room
    var application = this.data.application
    var telnum = this.data.telnum
    var yuanqu = this.data.yuanqu
    // console.log(item1, description, nowtime, seltime, room, application, telnum, yuanqu)
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
    //判断手机号
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (telnum.length == 0) {
      wx.showModal({
        title: '提示',
        content: '输入手机号不得为空!',
        showCancel: false,
        confirmColor: '#004CA0',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (telnum.length < 11) {
      wx.showModal({
        title: '提示',
        content: '手机号长度有误!',
        showCancel: false,
        confirmColor: '#004CA0',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (!myreg.test(telnum)) {
      wx.showModal({
        title: '提示',
        content: '手机号有误！',
        showCancel: false,
        confirmColor: '#004CA0',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })
      return false;
    }
    // console.log(nowyear, nowmonth, nowday, nowhour, nowmin)
    var dateTimeArray1 = this.data.dateTimeArray1
    var dateTime1 = this.data.dateTime1
    //选择时间
    var selyear = dateTimeArray1[0][dateTime1[0]]
    var selmonth = dateTimeArray1[1][dateTime1[1]]
    var selday = dateTimeArray1[2][dateTime1[2]]
    var selhour = dateTimeArray1[3][dateTime1[3]]
    var selminute = dateTimeArray1[4][dateTime1[4]]
    var seltime = selyear + "-" + selmonth + "-" + selday + " " + selhour + ":" + selminute
    // console.log(seltime)
    // console.log(dateTime1, dateTimeArray1)
    var that = this
    //判断是否存在空
    if (description != '' && room != '' && application != '' && item1 !='') {
      if (dateTimeArray1[0][dateTime1[0]] == nowyear) {
        if (dateTimeArray1[1][dateTime1[1]] < nowmonth) {
          wx.showModal({
            title: '提示',
            content: '维修时间不得在当前时间之前!',
            showCancel: false,
            confirmColor: '#004CA0',
            success: function(res) {
              if (res.confirm) {
                // console.log('用户点击确定')
              }
            }
          })
          return false;
        } else {
          if (dateTimeArray1[1][dateTime1[1]] > nowmonth) {
            // console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
            if (item1 == '') {
              wx.request({
                url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                }, // 设置请求的 header
                data: {
                  buildingNAME: yuanqu,
                  dormitoryID: room,
                  situation: description,
                  // imgs: item1,
                  requireServiceTime: seltime,
                  applicationPeopleName: application,
                  phone: telnum,
                  type: that.data.type,
                  xh: xh
                },
                success: res => {
                  // console.log(res.data)
                  if (res.data.Status == true) {
                    wx.showToast({
                      title: '申请成功',
                      icon: 'success',
                      duration: 1500
                    })
                    setTimeout(function() {
                      wx.navigateBack({
                        delta: 1
                      });
                    }, 1500)
                  } else {
                    wx.showToast({
                      title: '提交错误',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            } else {
              wx.uploadFile({
                url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd', //仅为示例，非真实的接口地址
                filePath: item1,
                name: 'file',
                formData: {
                  buildingNAME: yuanqu,
                  dormitoryID: room,
                  situation: description,
                  requireServiceTime: seltime,
                  applicationPeopleName: application,
                  phone: telnum,
                  type: that.data.type,
                  xh: xh
                },
                success: function(res) {
                  // console.log(JSON.parse(res.data))
                  var beback = JSON.parse(res.data)
                  if (beback.Status == true) {
                    wx.showToast({
                      title: '申请成功',
                      icon: 'success',
                      duration: 1500
                    })
                    setTimeout(function() {
                      wx.navigateBack({
                        delta: 1
                      });
                    }, 1500)
                  } else {
                    wx.showToast({
                      title: '提交错误',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }
              })
            }
          }
          if (dateTimeArray1[1][dateTime1[1]] == nowmonth) {
            if (dateTimeArray1[2][dateTime1[2]] < nowday) {
              wx.showModal({
                title: '提示',
                content: '维修时间不得在当前时间之前!',
                showCancel: false,
                confirmColor: '#004CA0',
                success: function(res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                  }
                }
              })
              return false;
            } else {
              if (dateTimeArray1[2][dateTime1[2]] > nowday) {
                // console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
                if (item1 == '') {
                  wx.request({
                    url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    }, // 设置请求的 header
                    data: {
                      buildingNAME: yuanqu,
                      dormitoryID: room,
                      situation: description,
                      // imgs: item1,
                      requireServiceTime: seltime,
                      applicationPeopleName: application,
                      phone: telnum,
                      type: that.data.type,
                      xh: xh
                    },
                    success: res => {
                      // console.log(res.data)
                      if (res.data.Status == true) {
                        wx.showToast({
                          title: '申请成功',
                          icon: 'success',
                          duration: 1500
                        })
                        setTimeout(function() {
                          wx.navigateBack({
                            delta: 1
                          });
                        }, 1500)
                      } else {
                        wx.showToast({
                          title: '提交错误',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  })
                } else {
                  wx.uploadFile({
                    url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd', //仅为示例，非真实的接口地址
                    filePath: item1,
                    name: 'file',
                    formData: {
                      buildingNAME: yuanqu,
                      dormitoryID: room,
                      situation: description,
                      requireServiceTime: seltime,
                      applicationPeopleName: application,
                      phone: telnum,
                      type: that.data.type,
                      xh: xh
                    },
                    success: function(res) {
                      // console.log(JSON.parse(res.data))
                      var beback = JSON.parse(res.data)
                      if (beback.Status == true) {
                        wx.showToast({
                          title: '申请成功',
                          icon: 'success',
                          duration: 1500
                        })
                        setTimeout(function() {
                          wx.navigateBack({
                            delta: 1
                          });
                        }, 1500)
                      } else {
                        wx.showToast({
                          title: '提交错误',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  })
                }
              }
              if (dateTimeArray1[2][dateTime1[2]] == nowday) {
                if (dateTimeArray1[3][dateTime1[3]] < nowhour) {
                  wx.showModal({
                    title: '提示',
                    content: '维修时间不得在当前时间之前!',
                    showCancel: false,
                    confirmColor: '#004CA0',
                    success: function(res) {
                      if (res.confirm) {
                        // console.log('用户点击确定')
                      }
                    }
                  })
                  return false;
                } else {
                  if (dateTimeArray1[3][dateTime1[3]] > nowhour) {
                    // console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
                    if (item1 == '') {
                      wx.request({
                        url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd',
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' // 默认值
                        }, // 设置请求的 header
                        data: {
                          buildingNAME: yuanqu,
                          dormitoryID: room,
                          situation: description,
                          // imgs: item1,
                          requireServiceTime: seltime,
                          applicationPeopleName: application,
                          phone: telnum,
                          type: that.data.type,
                          xh: xh
                        },
                        success: res => {
                          // console.log(res.data)
                          if (res.data.Status == true) {
                            wx.showToast({
                              title: '申请成功',
                              icon: 'success',
                              duration: 1500
                            })
                            setTimeout(function() {
                              wx.navigateBack({
                                delta: 1
                              });
                            }, 1500)
                          } else {
                            wx.showToast({
                              title: '提交错误',
                              icon: 'none',
                              duration: 2000
                            })
                          }
                        }
                      })
                    } else {
                      wx.uploadFile({
                        url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd', //仅为示例，非真实的接口地址
                        filePath: item1,
                        name: 'file',
                        formData: {
                          buildingNAME: yuanqu,
                          dormitoryID: room,
                          situation: description,
                          requireServiceTime: seltime,
                          applicationPeopleName: application,
                          phone: telnum,
                          type: that.data.type,
                          xh: xh
                        },
                        success: function(res) {
                          // console.log(JSON.parse(res.data))
                          var beback = JSON.parse(res.data)
                          if (beback.Status == true) {
                            wx.showToast({
                              title: '申请成功',
                              icon: 'success',
                              duration: 1500
                            })
                            setTimeout(function() {
                              wx.navigateBack({
                                delta: 1
                              });
                            }, 1500)
                          } else {
                            wx.showToast({
                              title: '提交错误',
                              icon: 'none',
                              duration: 2000
                            })
                          }
                        }
                      })
                    }
                  }
                  if (dateTimeArray1[3][dateTime1[3]] == nowhour) {
                    if (dateTimeArray1[4][dateTime1[4]] < nowmin) {
                      wx.showModal({
                        title: '提示',
                        content: '维修时间不得在当前时间之前!',
                        showCancel: false,
                        confirmColor: '#004CA0',
                        success: function(res) {
                          if (res.confirm) {
                            // console.log('用户点击确定')
                          }
                        }
                      })
                      return false;
                    } else {
                      // console.log(item1, description, nowtime, seltime, yuanqu, room, application, telnum)
                      if (item1 == '') {
                        wx.request({
                          url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd',
                          method: 'POST',
                          header: {
                            'content-type': 'application/x-www-form-urlencoded' // 默认值
                          }, // 设置请求的 header
                          data: {
                            buildingNAME: yuanqu,
                            dormitoryID: room,
                            situation: description,
                            // imgs: item1,
                            requireServiceTime: seltime,
                            applicationPeopleName: application,
                            phone: telnum,
                            type: that.data.type,
                            xh: xh
                          },
                          success: res => {
                            // console.log(res.data)
                            if (res.data.Status == true) {
                              wx.showToast({
                                title: '申请成功',
                                icon: 'success',
                                duration: 1500
                              })
                              setTimeout(function() {
                                wx.navigateBack({
                                  delta: 1
                                });
                              }, 1500)
                            } else {
                              wx.showToast({
                                title: '提交错误',
                                icon: 'none',
                                duration: 2000
                              })
                            }
                          }
                        })
                      } else {
                        wx.uploadFile({
                          url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd', //仅为示例，非真实的接口地址
                          filePath: item1,
                          name: 'file',
                          formData: {
                            buildingNAME: yuanqu,
                            dormitoryID: room,
                            situation: description,
                            requireServiceTime: seltime,
                            applicationPeopleName: application,
                            phone: telnum,
                            type: that.data.type,
                            xh: xh
                          },
                          success: function(res) {
                            // console.log(JSON.parse(res.data))
                            var beback = JSON.parse(res.data)
                            if (beback.Status == true) {
                              wx.showToast({
                                title: '申请成功',
                                icon: 'success',
                                duration: 1500
                              })
                              setTimeout(function() {
                                wx.navigateBack({
                                  delta: 1
                                });
                              }, 1500)
                            } else {
                              wx.showToast({
                                title: '提交错误',
                                icon: 'none',
                                duration: 2000
                              })
                            }
                          }
                        })
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        // console.log(item1, description, nowtime, seltime, room, application, telnum)
        if (item1 == '') {
          wx.request({
            url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            }, // 设置请求的 header
            data: {
              buildingNAME: yuanqu,
              dormitoryID: room,
              situation: description,
              // imgs: item1,
              requireServiceTime: seltime,
              applicationPeopleName: application,
              phone: telnum,
              type: that.data.type,
              xh: xh
            },
            success: res => {
              // console.log(res.data)
              if (res.data.Status == true) {
                wx.showToast({
                  title: '申请成功',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1500)
              } else {
                wx.showToast({
                  title: '提交错误',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          wx.uploadFile({
            url: 'https://dgnanbo.com:8001/api/Service/AddPropertyWarrantydd', //仅为示例，非真实的接口地址
            filePath: item1,
            name: 'file',
            formData: {
              buildingNAME: yuanqu,
              dormitoryID: room,
              situation: description,
              requireServiceTime: seltime,
              applicationPeopleName: application,
              phone: telnum,
              type: that.data.type,
              xh: xh
            },
            success: function(res) {
              // console.log(JSON.parse(res.data))
              var beback = JSON.parse(res.data)
              if (beback.Status == true) {
                wx.showToast({
                  title: '申请成功',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1500)
              } else {
                wx.showToast({
                  title: '提交错误',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '必须填项不得为空!',
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
    // console.log(time) 获取当前时间


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

    // console.log(options.type)
    var type = options.type
    this.setData({
      type
    })
    if (type == 1) {
      wx.setNavigationBarTitle({
        title: '物业报修申请'
      })
    }
    if (type == 2) {
      wx.setNavigationBarTitle({
        title: '宽带报修申请'
      })
    }
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