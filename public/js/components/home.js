const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Login = require('./login/login.js')
const Signup = require('./login/signup.js')
const Setting = require('./setting.js')
const Instructions = require('./instructions.js')
const Scores = require('./scores.js')
const Play = require('./play.js')

const Home = React.createClass({
  contextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func,
    router: React.PropTypes.object
  },

  render : function() {
    return (
      <div id="home">
        <h1 id="header">punnett²</h1>
        <Link className="play" to="/play">Play</Link>
        <Link className="scores" to="/scores">Scores</Link>
        <Link className="instructions" to="/instructions">Instuctions</Link>
        <Link id="settings" to="/settings"></Link>
      </div>
    )
  }
})

module.exports = Home;
