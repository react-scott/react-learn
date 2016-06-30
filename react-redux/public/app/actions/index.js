/**
*
* Action向store派发指令，action 函数会返回一个带有 type 属性的 Javascript Plain Object，
 * store将会根据不同的action.type来执行相应的方法。addItem函数的异步操作我使用了一点小技巧，
 * 使用redux-thunk中间件去改变dispatch，dispatch是在View层中用bindActionCreators绑定的。
* 使用这个改变的dispatch我们可以向store发送异步的指令。
* 比如说，可以在action中放入向服务端的请求(ajax)，也强烈推荐这样去做。
*
* */

import { ADD_ITEM, DELETE_ITEM, DELETE_ALL, FILTER_ITEM } from '../constants/actionTypes'

export function addItem() {
    return dispatch => {
        setTimeout(() => dispatch({type: ADD_ITEM}), 1000)
    }
}
export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        item
    }
}
export function deleteAll() {
    return {
        type: DELETE_ALL
    }
}
export function filterItem(e) {
    let filterItem = e.target.value

    return {
        type: FILTER_ITEM,
        filterItem
    }
}
