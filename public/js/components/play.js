const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Setting = require('./setting.js')
const Home = require('./home.js')
const Weather = require('./game/weather.js')
const Habitat = require('./game/habitat.js')

const Play = React.createClass({
  render : function() {
    if (localStorage.token) {
      return (
        <div id="gameContainer">
          <Weather/>
          <Habitat/>
          <Link to="/home">Menu</Link>
        </div>
      )
    } else {
      return (
        <div id="nope">
          <h1>Login!</h1>
          <Link to="/login">Login</Link>
        </div>
      )
    }
  }
})

module.exports = Play;
