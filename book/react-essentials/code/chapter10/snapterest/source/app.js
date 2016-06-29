var React = require('react');
var ReactDOM = require('react-dom');

var Application = require('./components/Application.react.js');
var WebAPIUtils = require('./utils/WebAPIUtils');

WebAPIUtils.initializeStreamOfTweets();

ReactDOM.render(<Application />, document.getElementById('react-application'));