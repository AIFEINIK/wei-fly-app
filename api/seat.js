let req = require('../utils/request.js')

export function listSeat() {
  return req.get('seat/listSeat', {})
}