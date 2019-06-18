// pages/emptyroom/emptyroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    ida: 0,
    idb: 0,
    idc: 0,
    winheight: '',
    building: ['1栋', '2栋', '3栋', '4栋', '6栋', '7栋', '8栋', '9栋'],
    cla: ['1-2节', '3-4节', '5-6节', '7-8节', '9-10节'],
    day: ['周一', '周二', '周三', '周四', '周五'],
    week: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周'],
    xn: '',
    xq: '',
    showdata: [],
    xqj: '',
    djj: '',
    zs: '',
    lou: ''
  },
  //点击几栋
  click: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    //console.log(ids)
    that.setData({
      id: ids //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var lou
    if (ids <= 3) {
      lou = ids + 1
    } else {
      lou = ids + 2
    }
    that.setData({
      lou: lou //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var xn = that.data.xn
    var xq = that.data.xq
    var xqj = that.data.xqj
    var djj = that.data.djj
    var zs = that.data.zs
    //console.log(xn, xq, xqj, djj, zs, lou)
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectEmptyClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XN: xn,
        XQ: xq,
        XQJ: xqj,
        DJJ: djj,
        ZS: zs,
        LOU: lou
      },
      success: res => {
        wx.hideLoading()
        //console.log(res.data)
        if (res.data.Status == true) {
          if (res.data.Lists != '') {
            var list = res.data.Lists
            var showdata = []
            for (var i = 0; i < list.length; i++) {
              showdata = showdata.concat(list[i].substring(2, 5));
            }
            var waishowdata = [],
              newarray = [],
              newarraya = [],
              newarrayb = [],
              newarrayc = [],
              newarrayd = [],
              newarraye = [],
              newarrayf = [],
              newarrayg = [],
              newarrayh = []
            for (var x = 0; x < showdata.length; x++) {
              var a = showdata[x].substring(0, 1);
              var b = x + 1
              //console.log(a)
              a = parseInt(a)
              if (a == 1) {
                newarray = newarray.concat(showdata[x])
                if (showdata[b].substring(0, 1) != a || showdata[b] == undefined) {
                  waishowdata = waishowdata.concat([newarray])
                }
              }
              if (a == 2) {
                newarraya = newarraya.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraya])
                }
              }
              if (a == 3) {
                newarrayb = newarrayb.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayb])
                }
              }
              if (a == 4) {
                newarrayc = newarrayc.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayc])
                }
              }
              if (a == 5) {
                newarrayd = newarrayd.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayd])
                }
              }
              if (a == 6) {
                newarraye = newarraye.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraye])
                }
              }
              if (a == 7) {
                newarrayf = newarrayf.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayf])
                }
              }
              if (a == 8) {
                newarrayg = newarrayg.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayg])
                }
              }
              if (a == 9) {
                newarrayh = newarrayh.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayh])
                }
              }
            }
            // console.log(showdata)
            // console.log(newarrayb, newarrayf)
            // waishowdata = waishowdata.concat([newarray],[newarrayb],newarrayf)
            //console.log(waishowdata)
            that.setData({
              showdata: waishowdata
            })
          } else {
            that.setData({
              showdata: []
            })
            wx.showToast({
              title: '暂无空教室',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          that.setData({
            showdata: []
          })
          wx.showToast({
            title: '查询不到教室',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        that.setData({
          showdata: []
        })
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //点击几节
  clicka: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    //console.log(ids)
    that.setData({
      ida: ids //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var djj = 2 * ids + 1
    //console.log(djj)
    that.setData({
      djj: djj
    })
    var xn = that.data.xn
    var xq = that.data.xq
    var xqj = that.data.xqj
    var zs = that.data.zs
    var lou = that.data.lou
    //console.log(xn, xq, xqj, djj, zs, lou)
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectEmptyClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XN: xn,
        XQ: xq,
        XQJ: xqj,
        DJJ: djj,
        ZS: zs,
        LOU: lou
      },
      success: res => {
        wx.hideLoading()
        //console.log(res.data)
        if (res.data.Status == true) {
          if (res.data.Lists != '') {
            var list = res.data.Lists
            var showdata = []
            for (var i = 0; i < list.length; i++) {
              showdata = showdata.concat(list[i].substring(2, 5));
            }
            var waishowdata = [],
              newarray = [],
              newarraya = [],
              newarrayb = [],
              newarrayc = [],
              newarrayd = [],
              newarraye = [],
              newarrayf = [],
              newarrayg = [],
              newarrayh = []
            for (var x = 0; x < showdata.length; x++) {
              var a = showdata[x].substring(0, 1);
              var b = x + 1
              //console.log(a)
              a = parseInt(a)
              if (a == 1) {
                newarray = newarray.concat(showdata[x])
                if (showdata[b].substring(0, 1) != a || showdata[b] == undefined) {
                  waishowdata = waishowdata.concat([newarray])
                }
              }
              if (a == 2) {
                newarraya = newarraya.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraya])
                }
              }
              if (a == 3) {
                newarrayb = newarrayb.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayb])
                }
              }
              if (a == 4) {
                newarrayc = newarrayc.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayc])
                }
              }
              if (a == 5) {
                newarrayd = newarrayd.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayd])
                }
              }
              if (a == 6) {
                newarraye = newarraye.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraye])
                }
              }
              if (a == 7) {
                newarrayf = newarrayf.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayf])
                }
              }
              if (a == 8) {
                newarrayg = newarrayg.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayg])
                }
              }
              if (a == 9) {
                newarrayh = newarrayh.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayh])
                }
              }
            }
            // console.log(showdata)
            // console.log(newarrayb, newarrayf)
            // waishowdata = waishowdata.concat([newarray],[newarrayb],newarrayf)
            //console.log(waishowdata)
            that.setData({
              showdata: waishowdata
            })
          } else {
            that.setData({
              showdata: []
            })
            wx.showToast({
              title: '暂无空教室',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          that.setData({
            showdata: []
          })
          wx.showToast({
            title: '查询不到教室',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        that.setData({
          showdata: []
        })
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //点击星期几
  clickb: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    //console.log(ids)
    that.setData({
      idb: ids //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var xqj = ids + 1
    that.setData({
      xqj: xqj //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var xn = that.data.xn
    var xq = that.data.xq
    var djj = that.data.djj
    var zs = that.data.zs
    var lou = that.data.lou
    //console.log(xn, xq, xqj, djj, zs, lou)
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectEmptyClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XN: xn,
        XQ: xq,
        XQJ: xqj,
        DJJ: djj,
        ZS: zs,
        LOU: lou
      },
      success: res => {
        wx.hideLoading()
        //console.log(res.data)
        if (res.data.Status == true) {
          if (res.data.Lists != '') {
            var list = res.data.Lists
            var showdata = []
            for (var i = 0; i < list.length; i++) {
              showdata = showdata.concat(list[i].substring(2, 5));
            }
            var waishowdata = [],
              newarray = [],
              newarraya = [],
              newarrayb = [],
              newarrayc = [],
              newarrayd = [],
              newarraye = [],
              newarrayf = [],
              newarrayg = [],
              newarrayh = []
            for (var x = 0; x < showdata.length; x++) {
              var a = showdata[x].substring(0, 1);
              var b = x + 1
              //console.log(a)
              a = parseInt(a)
              if (a == 1) {
                newarray = newarray.concat(showdata[x])
                if (showdata[b].substring(0, 1) != a || showdata[b] == undefined) {
                  waishowdata = waishowdata.concat([newarray])
                }
              }
              if (a == 2) {
                newarraya = newarraya.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraya])
                }
              }
              if (a == 3) {
                newarrayb = newarrayb.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayb])
                }
              }
              if (a == 4) {
                newarrayc = newarrayc.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayc])
                }
              }
              if (a == 5) {
                newarrayd = newarrayd.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayd])
                }
              }
              if (a == 6) {
                newarraye = newarraye.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraye])
                }
              }
              if (a == 7) {
                newarrayf = newarrayf.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayf])
                }
              }
              if (a == 8) {
                newarrayg = newarrayg.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayg])
                }
              }
              if (a == 9) {
                newarrayh = newarrayh.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayh])
                }
              }
            }
            // console.log(showdata)
            // console.log(newarrayb, newarrayf)
            // waishowdata = waishowdata.concat([newarray],[newarrayb],newarrayf)
            //console.log(waishowdata)
            that.setData({
              showdata: waishowdata
            })
          } else {
            that.setData({
              showdata: []
            })
            wx.showToast({
              title: '暂无空教室',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          that.setData({
            showdata: []
          })
          wx.showToast({
            title: '查询不到教室',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        that.setData({
          showdata: []
        })
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //点击第几周
  clickc: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    //console.log(ids)
    that.setData({
      idc: ids //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var zs = ids + 1
    that.setData({
      zs
    })
    var xn = that.data.xn
    var xq = that.data.xq
    var djj = that.data.djj
    var xqj = that.data.xqj
    var lou = that.data.lou
    //console.log(xn, xq, xqj, djj, zs, lou)
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectEmptyClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XN: xn,
        XQ: xq,
        XQJ: xqj,
        DJJ: djj,
        ZS: zs,
        LOU: lou
      },
      success: res => {
        wx.hideLoading()
        //console.log(res.data)
        if (res.data.Status == true) {
          if (res.data.Lists != '') {
            var list = res.data.Lists
            var showdata = []
            for (var i = 0; i < list.length; i++) {
              showdata = showdata.concat(list[i].substring(2, 5));
            }
            var waishowdata = [],
              newarray = [],
              newarraya = [],
              newarrayb = [],
              newarrayc = [],
              newarrayd = [],
              newarraye = [],
              newarrayf = [],
              newarrayg = [],
              newarrayh = []
            for (var x = 0; x < showdata.length; x++) {
              var a = showdata[x].substring(0, 1);
              var b = x + 1
              //console.log(a)
              a = parseInt(a)
              if (a == 1) {
                newarray = newarray.concat(showdata[x])
                if (showdata[b].substring(0, 1) != a || showdata[b] == undefined) {
                  waishowdata = waishowdata.concat([newarray])
                }
              }
              if (a == 2) {
                newarraya = newarraya.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraya])
                }
              }
              if (a == 3) {
                newarrayb = newarrayb.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayb])
                }
              }
              if (a == 4) {
                newarrayc = newarrayc.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayc])
                }
              }
              if (a == 5) {
                newarrayd = newarrayd.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayd])
                }
              }
              if (a == 6) {
                newarraye = newarraye.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraye])
                }
              }
              if (a == 7) {
                newarrayf = newarrayf.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayf])
                }
              }
              if (a == 8) {
                newarrayg = newarrayg.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayg])
                }
              }
              if (a == 9) {
                newarrayh = newarrayh.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayh])
                }
              }
            }
            // console.log(showdata)
            // console.log(newarrayb, newarrayf)
            // waishowdata = waishowdata.concat([newarray],[newarrayb],newarrayf)
            //console.log(waishowdata)
            that.setData({
              showdata: waishowdata
            })
          } else {
            that.setData({
              showdata: []
            })
            wx.showToast({
              title: '暂无空教室',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          that.setData({
            showdata: []
          })
          wx.showToast({
            title: '查询不到教室',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        that.setData({
          showdata: []
        })
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
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
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        //console.log(res.windowHeight) // 获取可使用窗口高度
        let windowHeight = (res.windowHeight * (750 / res.windowWidth)); //将高度乘以换算后的该设备的rpx与px的比例
        //console.log(windowHeight) //最后获得转化后得rpx单位的窗口高度
        that.setData({
          winheight: windowHeight - 480
        })
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
    var myDate = new Date();
    var nowyear = myDate.getFullYear(); //当前年
    var nowmonth = myDate.getMonth() + 1; //当前月
    //console.log(nowyear, nowmonth)
    var xn, xq
    if (nowmonth < 9) {
      var yearago = nowyear - 1
      xn = yearago + '-' + nowyear
      xq = 2
    } else {
      var yearnext = nowyear + 1
      xn = nowyear + '-' + yearnext
      xq = 1
    }
    var computeweek = wx.getStorageSync('computeweek')
    //console.log(computeweek)
    var nowdayweek = wx.getStorageSync('nowdayweek')
    //console.log(nowdayweek)
    var stoweekday
    if (nowdayweek == '周一') {
      stoweekday = 0
    }
    if (nowdayweek == '周二') {
      stoweekday = 1
    }
    if (nowdayweek == '周三') {
      stoweekday = 2
    }
    if (nowdayweek == '周四') {
      stoweekday = 3
    }
    if (nowdayweek == '周五') {
      stoweekday = 4
    }
    var idc, idb
    if (computeweek != '') {
      idc = computeweek + 1
      idb = stoweekday + 1
    } else {
      idc = that.data.idc + 1
      idb = that.data.idb + 1
    }
    var id = 1
    var ida = 1
    //var idb = that.data.idb + 1
    // var idc = that.data.idc + 1
    that.setData({
      xn: xn,
      xq: xq,
      xqj: idb,
      djj: ida,
      zs: idc,
      lou: id,
      idc: computeweek,
      idb: stoweekday,
      id: 0,
      ida: 0
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://dgnanbo.com:8001/api/Data/SelectEmptyClass',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        XN: xn,
        XQ: xq,
        XQJ: idb,
        DJJ: ida,
        ZS: idc,
        LOU: id
      },
      success: res => {
        wx.hideLoading()
        //console.log(res.data)
        if (res.data.Status == true) {
          if (res.data.Lists != '') {
            var list = res.data.Lists
            var showdata = []
            for (var i = 0; i < list.length; i++) {
              showdata = showdata.concat(list[i].substring(2, 5));
            }
            var waishowdata = [],
              newarray = [],
              newarraya = [],
              newarrayb = [],
              newarrayc = [],
              newarrayd = [],
              newarraye = [],
              newarrayf = [],
              newarrayg = [],
              newarrayh = []
            for (var x = 0; x < showdata.length; x++) {
              var a = showdata[x].substring(0, 1);
              var b = x + 1
              //console.log(a)
              a = parseInt(a)
              if (a == 1) {
                newarray = newarray.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarray])
                }
              }
              if (a == 2) {
                newarraya = newarraya.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraya])
                }
              }
              if (a == 3) {
                newarrayb = newarrayb.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayb])
                }
              }
              if (a == 4) {
                newarrayc = newarrayc.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayc])
                }
              }
              if (a == 5) {
                newarrayd = newarrayd.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayd])
                }
              }
              if (a == 6) {
                newarraye = newarraye.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarraye])
                }
              }
              if (a == 7) {
                newarrayf = newarrayf.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayf])
                }
              }
              if (a == 8) {
                newarrayg = newarrayg.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayg])
                }
              }
              if (a == 9) {
                newarrayh = newarrayh.concat(showdata[x])
                if (showdata[b] == undefined || showdata[b].substring(0, 1) != a) {
                  waishowdata = waishowdata.concat([newarrayh])
                }
              }
            }
            // console.log(showdata)
            // console.log(newarrayb, newarrayf)
            // waishowdata = waishowdata.concat([newarray],[newarrayb],newarrayf)
            //console.log(waishowdata)
            that.setData({
              showdata: waishowdata
            })
          } else {
            that.setData({
              showdata: []
            })
            wx.showToast({
              title: '暂无空教室',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          that.setData({
            showdata: []
          })
          wx.showToast({
            title: '查询不到教室',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: res => {
        that.setData({
          showdata: []
        })
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
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