/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { fetchCounter } from '../common/api/counter'

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// This is fired every time the server side receives a request
app.use(handleRender)

/**
 * 服务端请求api，发送html串和state
 * @param req
 * @param res
 */
function handleRender(req, res) {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter, 10) || apiResult || 0

    // Compile an initial state
    const initialState = { counter }

    // Create a new Redux store instance
    const store = configureStore(initialState)

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )

    // Grab the initial state from our Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
  })
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

/**
 * api写好了，我们调用了这个api，即fetchCounter，这个api函数也会产生一个回调，我们在回调中获取counter值
 如果中间件请求中有参数，则const params = qs.parse(req.query)，counter为parseInt(params.counter, 10)。
 否则counter为api的回调中返回的值apiResult，如果前两个都没有则为0。qs用于解析http请求中的querystring，就是？param=sth。
 得到counter，我们就得到了state，用state作为参数，重新生成一个store实例，每次都要重新生成一个新的store实例。
 然后用react的服务端渲染生成一个html串，把它发送出去
 同时，我们还要发送一个const finalState = store.getState()出去，让客户端拿到这个state渲染，为什么？
 因为要保证客户端和服务端渲染的组件一样。
 */

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
