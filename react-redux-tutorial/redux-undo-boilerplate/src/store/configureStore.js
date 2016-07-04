/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux'
// reducer
import rootReducer from '../reducers'
// middleware
/**
 * 那个thunk是什么？thunk我们已经在react+redux教程（一）里面讲过了。
 */
import thunkMiddleware from 'redux-thunk'
/**
 * 那么什么是promiseMiddleware？这也是个中间件，和thunk一样，使得你的action可以具备异步的功能。
 * 不过，我们可以发现，本例中我们并没有用到thunk和promiseMiddleware这两个中间件，
 * 本例子是个种子文件，可以在这个基础上拓展，所以作者提前写好了两个常用中间件，便于我们日后使用！
 */
import promiseMiddleware from 'redux-promise'
/**
 * 那么loggerMiddleware是用来干嘛的？顾名思义，就是用来记录日志的，当你添加这个中间件，你可以在命令行中看到相关的打印日志！
 * 当然你可以在运行程序的时候，去掉这个中间件，来对比观察它的作用！
 */
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})

/**
 * enforceImmutableMiddleware是什么？干嘛用的？这个使用禁止你改变state的
 * 什么？不改变state，我们如何更新状态，redux不允许你改变state，在reducer中我们必须要返回一个新的state，
 * 而不是修改原来的state！
 */
const enforceImmutableMiddleware = require('redux-immutable-state-invariant')()

let createStoreWithMiddleware

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const { persistState } = require('redux-devtools')
  const DevTools = require('../containers/DevTools')
  createStoreWithMiddleware = compose(
    applyMiddleware(
      enforceImmutableMiddleware,
      thunkMiddleware,
      promiseMiddleware,
      loggerMiddleware
    ),
    /**
     * DevTools.instrument() 这行代码使得devtools可以使用了！
     * 有的同学会问，这个instrument()是什么鬼？官方称之为store enhancer，
     * 翻译过来就是store加强器，跟applymiddleware是一类，都是store加强器。
     * 那么store加强器，能干什么？store加强器可以重新构建一个更牛逼的store，
     * 来替换之前的基础版的store，让你的程序可以增加很多别的功能，
     * 比如appllymiddleware可以给你的redux增加中间件，使之可以拥有异步功能，日志功能等！
     */
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware)
  )(createStore)
}
/**
 * instrument()与compose()写法
 instrument()不同于applymiddleware，它只能用于开发环境，只能enable你的devtools组件！
 那么我们把applymiddleware和instrument用逗号隔开，为什么？这是compose写法，用来代替以前的函数嵌套！
 */




/**
 * 到此为止，devtools我们就安装好了，就是这么简单！
 * 把它渲染出来就可以了，可以放在整个程序的下面就可以了！
 */
/**
 * Creates a preconfigured store.
 */
export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
