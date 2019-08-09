export function statusFilter(val) {
  switch (parseInt(val)) {
  	case 0: return '待确认'
    case 1: return '已确认'
    case 2: return '已取消'
    default: return ''
  }
}

export function payStatusFilter(val) {
  switch (parseInt(val)) {
  	case 0: return '未付款'
    case 1: return '部分付款'
    case 2: return '付款完成'
    default: return ''
  }
}

export function sendStatusFilter(val) {
  switch (parseInt(val)) {
  	case 0: return '未发货'
    case 1: return '部分发货'
    case 2: return '发货完成'
    default: return ''
  }
}

export function selfSupportFilter(val) {
  switch (parseInt(val)) {
    case 0: return '自营'
    case 1: return '非自营'
    default: return ''
  }
}

export function productStatusFilter(val) {
  switch (parseInt(val)) {
    case 0: return '已创建'
    case 1: return '待审核'
    case 2: return '审核通过'
    case 3: return '驳回'
    default: return ''
  }
}

export function enquiryStatusFilter(val) {
  switch (parseInt(val)) {
    case 0: return '询价中'
    case 1: return '已完成'
    case 2: return '终止报价'
    case 3: return '已关闭'
    default: return ''
  }
}

export function quationStatusFilter(val) {
  switch (parseInt(val)) {
    case 0: return '待确认'
    case 1: return '已接受'
    case 2: return '未接受'
    case 3: return '已关闭'
    default: return ''
  }
}

export function accountTypeFilter(val) {
  switch (parseInt(val)) {
    case 0: return '普通会员'
    case 1: return '客户'
    case 2: return '供应商'
    case 3: return '客户供应商'
    default: return ''
  }
}

export function checkStateFilter(val) {
  switch (parseInt(val)) {
    case -1: return '驳回'
    case 0: return '未准入'
    case 1: return '已准入'
    default: return ''
  }
}