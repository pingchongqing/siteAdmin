import request from '@/utils/request'
// 入库金额POST /api/oilcodemeter/getAllInAmount
export function InstoreAmount(data) {
  return request({
    url: '/jqmapi/api/oilcodemeter/getAllInAmount',
    method: 'post',
    data
  })
}
// 出库金额POST /api/oilcodemeter/getAllOutAmount
export function OutstoreAmount(data) {
  return request({
    url: '/jqmapi/api/oilcodemeter/getAllOutAmount',
    method: 'post',
    data
  })
}
// 销售金额 POST /api/oilcodemeter/getAllSoAmount
export function SaleAmount(data) {
  return request({
    url: '/jqmapi/api/oilcodemeter/getAllSoAmount',
    method: 'post',
    data
  })
}
// 采购金额 POST /api/oilcodemeter/getAllPoAmount
export function PurchaseAmount(data) {
  return request({
    url: '/jqmapi/api/oilcodemeter/getAllPoAmount',
    method: 'post',
    data
  })
}
// 库存金额占比POST /api/onlinestock/getStockProportion
export function StockProportion(data) {
  return request({
    url: '/jqmapi/api/onlinestock/getStockProportion',
    method: 'post',
    data
  })
}
// 采购执行情况POST /api/vBiPurchorderTrackw/listVBiPurchorderTrackD
export function PurchorderTrackD(data) {
  return request({
    url: '/yyjapi/api/vBiPurchorderTrackw/listVBiPurchorderTrackD',
    method: 'post',
    data
  })
}
// 采购执行情况按月 POST /api/vBiPurchorderTrackw/listVBiPurchorderTrackM
export function PurchorderTrackM(data) {
  return request({
    url: '/yyjapi/api/vBiPurchorderTrackw/listVBiPurchorderTrackM',
    method: 'post',
    data
  })
}
// 销售执行情况POST /api/vBiSaleorderTrackw/listVBiSaleorderTrackD
export function SaleTrackD(data) {
  return request({
    url: '/yyjapi/api/vBiSaleorderTrackw/listVBiSaleorderTrackD',
    method: 'post',
    data
  })
}
// 销售执行情况按月POST /api/vBiSaleorderTrackw/listVBiSaleorderTrackM
export function SaleTrackM(data) {
  return request({
    url: '/yyjapi/api/vBiSaleorderTrackw/listVBiSaleorderTrackM',
    method: 'post',
    data
  })
}
// 客户报价金额中标比例POST /api/statisticalData/quotationRate
export function QuotationRate(data) {
  return request({
    url: '/planapi/api/statisticalData/quotationRate',
    method: 'post',
    data
  })
}
// POST /api/statisticalData/statisticalMoneyByDay 以天计算客户报价以及销售金额
export function StatisticalMoneyByDay(data) {
  return request({
    url: '/planapi/api/statisticalData/statisticalMoneyByDay',
    method: 'post',
    data
  })
}
// POST /api/statisticalData/statisticalMoneyByMonth 以月计算客户报价以及销售金额
export function StatisticalMoneyByMonth(data) {
  return request({
    url: '/planapi/api/statisticalData/statisticalMoneyByMonth',
    method: 'post',
    data
  })
}
// POST /api/onlinestock/getInventoryAmountForDay 每日在库库存金额API
export function InventoryAmountForDay(data) {
  return request({
    url: '/jqmapi/api/onlinestock/getInventoryAmountForDay',
    method: 'post',
    data
  })
}
// POST /api/onlinestock/getInventoryAmountForMonth 每月平均在库库存金额API
export function InventoryAmountForMonth(data) {
  return request({
    url: '/jqmapi/api/onlinestock/getInventoryAmountForMonth',
    method: 'post',
    data
  })
}
// POST /api/statisticalData/scheduleForOrderNum 以天获取计划单、报价单以及销售单的数量
export function ScheduleForOrderNum(data) {
  return request({
    url: '/planapi/api/statisticalData/scheduleForOrderNum',
    method: 'post',
    data
  })
}
// POST /api/statisticalData/schedule 获取当天的计划单进度跟进
export function Schedule(data) {
  return request({
    url: '/planapi/api/statisticalData/schedule',
    method: 'post',
    data
  })
}
