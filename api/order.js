let req = require('../utils/request.js')

export function createOrder(orderForm) {
  return req.post('orderMgr/createOrder', orderForm)
}

export function todayOrder() {
  return req.get('orderMgr/todayOrder', {})
}