const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//得到时间格式2018-10-02
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')

}

//todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

//kuaidi
const isFunction = val => (typeof val === 'function');

const showLoading = (text, typeKey, time) => {
  wx.showToast({
    title: text,
    icon: typeKey,
    duration: time,
    complete: function() {}
  })
}

const hideToast = () => wx.hideToast();

const getWindowSize = () => {
  const data = {}
  wx.getSystemInfo({
    success: res => {
      data.wWidth = res.windowWidth
      data.wHeight = res.windowHeight
      data.scale = 750 / res.windowWidth
    }
  })
  return data
}
module.exports = {
  formatTime: formatTime,
   formatDate: formatDate,
  // getDates: getDates
  isFunction,
  showLoading,
  hideToast,
  getWindowSize,
  getDates: getDates
}