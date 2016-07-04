/* global __DEVTOOLS__ */
/*eslint-disable*/
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import configureStore from '../store/configureStore'
import routes from '../routes'
/*eslint-enable*/

const store = configureStore()


/**
 * 这段代码，我们将我们导出的devtools组件放在了router这个组件的下面，
 * 不过我们加了一个typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__的判断，
 * 如果条件成立，我们将渲染devtools，否则不渲染。这样做，意味着我们可以通过参数控制devtools在开发环境中显示，
 * 在生产环境中不显示。

   是不是渲染出来，就可以了？当然不是！我们还需要在store里面注册！
 
 * @param history
 * @returns {XML[]}
 */
function createElements (history) {
  const elements = [
    <Router key="router" history={history} children={routes} />
  ]

  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    /*eslint-disable*/
    const DevTools = require('./DevTools')
    /*eslint-enable*/
    elements.push(<DevTools key="devtools" />)
  }

  return elements
}

export default class Root extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={store} key="provider">
        <div>
          {createElements(this.props.history)}
        </div>
      </Provider>
    )
  }
}
