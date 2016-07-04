import { combineReducers } from 'redux'
import counter from './counter'
import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  UNDO_COUNTER, REDO_COUNTER
} from '../actions/counter'
import undoable, { includeAction } from 'redux-undo'

/**
 * 我们使用redux-undo这个包给我们提供的undoable和includeAction，
 * 就可以可以给指定reducer（counter）添加撤销功能。filter是选择过滤的action有哪些，
 * 这里我们只撤销重做加减action，也就是INCREMENT_COUNTER, DECREMENT_COUNTER，
 limit是次数限制，
 debug是是否调试码，
 undotype和redotype是撤销重做的action。

 如此以来，我只需要触发撤销重做的action便可以实现撤销重做功能，就是这么简单！
 */
const rootReducer = combineReducers({
  counter: undoable(counter, {
    filter: includeAction([INCREMENT_COUNTER, DECREMENT_COUNTER]),
    limit: 10,
    debug: true,
    undoType: UNDO_COUNTER,
    redoType: REDO_COUNTER
  })
})

export default rootReducer
