import { all, call } from 'redux-saga/effects'

import { ShopSagas } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

export default function* rootSaga(){
    yield all ([
        call(ShopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}