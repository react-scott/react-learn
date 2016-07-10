/**
 * Created by scott on 7/10/16.
 */

import React from 'react'

import { render } from 'react-dom'

import { Router, Route, hashHistory} from 'react-router'

import App from './modules/App'

import About from './modules/About'

import Repos from './modules/Repos'

render((
    <Router history={hashHistory}>
        <route path="/" component={App}/>
        <route path="/repos" component={Repos}/>
        <route path="/about" component={About}/>
    </Router>
), document.getElementById('app'))