const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../../script.js')
const Signup = require('./signup.js')

const Login = React.createClass({

  contextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func,
    router: React.PropTypes.object
  },

  componentDidMount : function() {
    function rando(max,min) {
      return Math.floor(Math.random() * max) + min;
    }

    function hustle($buds) {
      $buds.animate({'left': rando(90, 5) + '%'}, rando(8000,4000))
      var intervalID = window.setInterval(() => {
        $buds.animate({'left': rando(90, 5) + '%'}, rando(8000,4000))
      }, 4000);
    }

    for (var i = 0; i < 15; i++) {
      var $buds = $('<div>');
      $buds.addClass('buds');
      $buds.attr('id', $.now())
      $('body').append($buds);
      hustle($buds);
    }
  },

  handleSubmit : function(event) {
    event.preventDefault();
    const username = this.refs.username.value
    const password = this.refs.password.value

    $.post('/users/login',{
      username: username,
      password: password
    })
    .done((data) => {
      localStorage.token = data.token;
      this.context.setLoggedInTrue(true);
      this.context.router.replace('/home')
    })
    this.refs.form.reset()
  },

  render : function() {
    if (!localStorage.token) {
      return (
        <div id="login">
          <form ref="form" onSubmit={this.handleSubmit}>
            <h1 className="header">Welcome back to punnett²!</h1>
            <input id="loginUsername" type="text" ref="username" placeholder="username"/>
            <input id="loginPassword" type="password" ref="password" placeholder="password" /><br />
            <button type="submit">login</button>
            <Link to="/signup">Signup</Link>
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

module.exports = Login;
