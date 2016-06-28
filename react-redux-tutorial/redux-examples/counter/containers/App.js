import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

/*
  state就是数据，组件就是数据的呈现形式，action是动作，action是通过reducer来更新state的。

  上述代码，我们干了几件事：

    1. 把state的counter值绑定到props上

    2. 把四个action创建函数绑定到props上

*/
