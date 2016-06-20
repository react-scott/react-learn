import { combineReducers } from 'redux'
import items from './items'
import filter from './filter'
/**
 * Redux提供的combineReducers函数可以帮助我们把reducer组合在一起，
 * 这样我们就可以把Reducers拆分成一个个小的Reducer来管理Store了。
 *
 */
const rootReducer = combineReducers({
    items,
    filter
})

export default rootReducer
