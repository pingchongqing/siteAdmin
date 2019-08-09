/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    if (time && typeof time === 'string' && !time.includes('Z')) time = time.replace(new RegExp(/-/gm), '/')
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  // time = +time * 1000
  if (time && !time.includes('Z')) time = time.replace(new RegExp(/-/gm), '/')
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function printUrl(name, ticketno) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'http://nb.csjscm.com:9999/WebReport/ReportServer?reportlet=/HALL_TEST/' + name + '.cpt&ticketno=' + ticketno
  } else if (process.env.NODE_ENV === 'production') {
    return 'http://nb.csjscm.com:9999/WebReport/ReportServer?reportlet=/HALL/' + name + '.cpt&ticketno=' + ticketno
  }
}

export function reportCenterUrl(name) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return 'http://nb.csjscm.com:9999/WebReport/ReportServer?reportlet=/HALL_TEST/' + name + '.cpt'
  } else if (process.env.NODE_ENV === 'production') {
    return 'http://nb.csjscm.com:9999/WebReport/ReportServer?reportlet=/HALL/' + name + '.cpt'
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
// export const LoginPath = process.env.NODE_ENV === 'production' ? 'http://sso.csjscm.com' : 'http://192.168.1.224:8099'
export const LoginPath = 'http://192.168.1.224:8099'

// 返回连续时间段的数据
export function DealChartDataByDay(data, type, params) {
  // 排序函数
  const sortData = function(a, b) {
    if (parseInt(b[type].replace(/\-/g, '')) > parseInt(a[type].replace(/\-/g, ''))) {
      return -1
    } else if (parseInt(b[type].replace(/\-/g, '')) < parseInt(a[type].replace(/\-/g, ''))) {
      return 1
    } else if (parseInt(b[type].replace(/\-/g, '')) === parseInt(a[type].replace(/\-/g, ''))) {
      return 0
    }
  }
  // 对数组进行排序
  const sortedData = data.sort(sortData)
  // 取得数据开始和结束
  const beginDate = parseInt(sortedData[0][type].replace(/\-/g, ''))
  const now = new Date()
  const nowMonth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1).toString()
  const nowDate = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  const nowFullDate = parseInt(now.getFullYear().toString() + nowMonth + nowDate)
  // 取得前一的时间
  function getPreDate(d) {
    const nd = new Date()
    const argtime = nd.setFullYear(parseInt(d.toString().slice(0, 4)), parseInt(d.toString().slice(4, 6)) - 1, parseInt(d.toString().slice(6, 8)))
    const preDate = new Date(argtime - 24 * 60 * 60 * 1000)
    const preDateMonth = (preDate.getMonth() + 1) < 10 ? '0' + (preDate.getMonth() + 1) : (preDate.getMonth() + 1).toString()
    const preDateDate = preDate.getDate() < 10 ? '0' + preDate.getDate() : preDate.getDate()
    const preDateFullDate = parseInt(preDate.getFullYear().toString() + preDateMonth + preDateDate)
    return preDateFullDate
  }
  // 生成开始时间到今天的时间数组
  const timearr = []
  // 开始时间大于当前时间可能是本地时间设置错误
  if (beginDate > nowFullDate) {
    return false
  }
  let pm = nowFullDate
  while (pm >= beginDate) {
    timearr.push(pm)
    pm = getPreDate(pm)
  }
  let returnData = []
  timearr.map(item => {
    if (params) {
      const attr = { ...params }
      attr[type] = item.toString().slice(0, 4) + '-' + item.toString().slice(4, 6) + '-' + item.toString().slice(6, 8)
      returnData.push(attr)
    }
  })
  returnData.forEach(item => {
    data.map(d => {
      if (d[type] === item[type]) {
        for (const key in params) {
          item[key] = d[key]
        }
      }
    })
  })
  returnData = returnData.reverse()
  return returnData
}

// 返回连续时间段的数据
export function DealChartDataByMonth(data, type, params) {
  // 排序函数
  const sortData = function(a, b) {
    return parseInt(b[type].replace(/\-/g, '')) < parseInt(a[type].replace(/\-/g, ''))
  }
  // 对数组进行排序
  const sortedData = data.sort(sortData)
  // 取得数据开始和结束
  const beginMonth = parseInt(sortedData[0][type].replace(/\-/g, ''))
  const now = new Date()
  const nowMonth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1).toString()
  const nowFullDate = parseInt(now.getFullYear().toString() + nowMonth)
  // 取得前一月的时间
  function getPreMonth(d) {
    const nd = new Date()
    // 计算当前月份天数
    let currentMonthDays = 30
    const currentMonth = parseInt(d.toString().slice(4, 6))
    const currentYear = parseInt(d.toString().slice(0, 4))
    if ([1, 3, 5, 7, 8, 10, 12].includes(currentMonth)) {
      currentMonthDays = 31
    } else if (currentMonth === 2) {
      // 如果是闰年
      if (((currentYear % 4) === 0) && ((currentYear % 100) !== 0) || ((currentYear % 400) === 0)) {
        currentMonthDays = 29
      } else {
        currentMonthDays = 28
      }
    }
    const argtime = nd.setFullYear(parseInt(d.toString().slice(0, 4)), parseInt(d.toString().slice(4, 6)) - 1, currentMonthDays)
    const preDate = new Date(argtime - 24 * 60 * 60 * 1000 * currentMonthDays)
    const preDateMonth = (preDate.getMonth() + 1) < 10 ? '0' + (preDate.getMonth() + 1) : (preDate.getMonth() + 1).toString()
    const preDateFullDate = parseInt(preDate.getFullYear().toString() + preDateMonth)
    return preDateFullDate
  }
  // 生成开始时间到今天的时间数组
  const timearr = []
  // 开始时间大于当前时间可能是本地时间设置错误
  if (beginMonth > nowFullDate) {
    return false
  }
  let pm = nowFullDate
  while (pm >= beginMonth) {
    timearr.push(pm)
    pm = getPreMonth(pm)
  }
  let returnData = []
  timearr.map(item => {
    if (params) {
      const attr = { ...params }
      attr[type] = item.toString().slice(0, 4) + '-' + item.toString().slice(4, 6)
      returnData.push(attr)
    }
  })
  returnData.forEach(item => {
    data.map(d => {
      if (d[type] === item[type]) {
        for (const key in params) {
          item[key] = d[key]
        }
      }
    })
  })
  returnData = returnData.reverse()
  return returnData
}

export const PayFundnature = [
  {
    name: '货款',
    value: 1
  },
  {
    name: '服务费',
    value: 2
  },
  {
    name: '投标保证金',
    value: 3
  }
]

export function downloadFile(file) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    if (file.includes('/file')) {
      return 'http://testscm.csjmro.com' + file
    } else {
      return 'http://testscm.csjmro.com/file' + file
    }
  } else if (process.env.NODE_ENV === 'production') {
    if (file.includes('/file')) {
      return 'http://scm.csjmro.com' + file
    } else {
      return 'http://scm.csjmro.com/file' + file
    }
  }
}