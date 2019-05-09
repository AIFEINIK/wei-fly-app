let req = require('../utils/request.js')

export function listRecord(recordForm) {
  return req.get('record/listRecord', recordForm)
}