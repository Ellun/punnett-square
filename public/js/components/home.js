const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Login = require('./login/login.js')
const Signup = require('./login/signup.js')

const Home = React.createClass({
  contextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func,
    router: React.PropTypes.object
  },

  handleLogout : function() {
    delete localStorage.token
    this.context.setLoggedInTrue(false);
    this.context.router.replace('/login')
  },

  render : function() {
    return (
      <div id="home">
        <h1 id="header">punnett²</h1>
        <button>Instructions</button>
        <button>Play</button>
        <button>Scores</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
})

module.exports = Home;
