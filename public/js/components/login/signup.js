const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../../script.js')
const Login = require('./login.js')

const Signup = React.createClass({

  contextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func,
    router: React.PropTypes.object
  },

  handleSubmit : function(event) {
    event.preventDefault();
    const username = this.refs.username.value
    const password = this.refs.password.value
    const confirmPass = this.refs.confirmPass.value

    if (password == confirmPass) {
      $.post('/users',{
        username: username,
        password: password
      })
      .done((data) => {
        localStorage.token = data.token;
        this.context.setLoggedInTrue(true);
        this.context.router.replace('/home')
      })
    } else {
      console.log('boo');
    }
    this.refs.form.reset()
  },

  render : function() {
    if (!localStorage.token) {
      return (
        <div id="signup">
          <form ref="form" onSubmit={this.handleSubmit}>
            <h1 id="header">Welcome to punnett²!</h1>
            <input id="loginUsername" type="text" ref="username" placeholder="username"/>
            <input id="loginPassword" type="password" ref="password" placeholder="password" /><br />
            <input id="confirmPassword" type="password" ref="confirmPass" placeholder="confirm password" /><br />
            <button type="submit">Signup</button>
            <Link to="/login">Login</Link>
          </form>
        </div>
      )
    } else {
      return (
        <div id="signup">
          <h3>You are already signed in!</h3>
          <Link to="/home">Home</Link>
        </div>
      )
    }
  }
})

module.exports = Signup;
