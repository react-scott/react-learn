/*eslint-disable*/
import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import * as containers from './containers'
/*eslint-enable*/

const {
  CounterPage
} = containers

/**
 * 简单来说，router也是个组件，一个多重视图的组件，这个组件可以通过切换url来切换视图，总之它还是个组件。
 * 既然是组件，我们只要把它渲染出来就可以了！

 最顶层我们要渲染一个Router,代码在containers/Root.js中，我们就不重复列出代码清单了。

 然后我们开始渲染各个视图，这里我们只有一个视图，也就是目录是“/”的视图，我们把它渲染出来！
 */
export default (
  <Route component={App}>
    <Route path="/" component={CounterPage} />
  </Route>
)
/**
 * 我们导出了一个视图，这个视图的组件是CounterPage。就是这么简单！

 然后，我们在containers/Root.js，将它渲染到Router组件里面就可以了！
 */
