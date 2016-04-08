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
        <h1 className="header">Instructions</h1>
        <p> Stop sucking at games </p>
        <Link id="scoresHome" to="/home">Menu</Link>
      </div>
    )
  }
})

module.exports = Instructions;
