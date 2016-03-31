const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Setting = require('./setting.js')
const Home = require('./home.js')

const Instructions = React.createClass({
  render : function() {
    return (
      <div id="instructions">
        <p> Stop sucking at games </p>
        <Link to="/home">Home</Link>
      </div>
    )
  }
})

module.exports = Instructions;
