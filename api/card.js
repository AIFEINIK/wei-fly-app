let req = require('../utils/request.js')

export function createCard(cardForm) {
  return req.post('card/createCard', cardForm)
}

export function getCard() {
    return req.get('card/getCard', {})
}

export function unbindCard(cardForm) {
    return req.post('card/unbindCard', cardForm)
}