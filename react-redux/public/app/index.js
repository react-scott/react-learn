/**
*
* 在入口文件中，我们需要把App和redux建立起联系。Provider是react-redux提供的组件，
* 它的作用是把store和视图绑定在了一起，这里的Store就是那个唯一的State树。
* 当Store发生改变的时候，整个App就可以作出对应的变化。
* 这里的会传进Provider的props.children里。
*
* */

import '../scss/pure.scss'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './configureStore'

const store = configureStore()

function renderDevTools(store) {
    if (__DEBUG__) {
        let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react')

        return (
            <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        )
    }

    return null
}

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        {renderDevTools(store)}
    </div>,
    document.getElementById('app'))
