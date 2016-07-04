/*eslint-disable*/
import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
/*eslint-enable*/

/**
 * devtools是什么？devtools的实质其实也是组件。
 * devtools能干什么？devtools可以帮助我们看到整个程序的状态和整个程序的触发的action的日志记录。
 * 我们如何安装devtools呢？首先，我们知道devtools是个组件，
 * 那么我们直接把devtools放在容器中渲染出来不就可以了吗？
 */
export default createDevTools(
  <DockMonitor toggleVisibilityKey="H"
               changePositionKey="Q">
    <LogMonitor />
  </DockMonitor>
)
/**
 * 这是一个可以复用的容器代码，也就意味着，你可以直接把这个js文件，复制粘贴到你的项目中。
 * 这段代码我们输出了一个devtools组件。
 */
