const $     = require('jquery'); // requires jQuery module
const React = require('react'); // requires React module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

/* login component */
const Login = React.createClass({

  getInitialState : function() {
    return {
      error : ''
    }
  },

  contextTypes: {
    setLoggedInTrue : React.PropTypes.func, // determines if logged in or not
    router : React.PropTypes.object // redirects to a different view
  },

  /* When login button is hit */
  handleSubmit : function(event) {
    event.preventDefault(); // prevents page from refreshing
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    let error = 'Oops, please check your username or password'
    if (username == '' || password == '') { // checks for real username/password
      this.setState({error:error})
    }

    $.post('/users/login',{ // AJAX post request to users/login route
      username: username,
      password: password
    })
    .done((data) => {
      if (data.agent == 'error') { // if username/password doesn't match
        this.setState({error:error})
      } else { // if login is successful
        localStorage.token = data.token;
        this.context.setLoggedInTrue(true);
        this.context.router.replace('/home')
      }
    })
    this.refs.form.reset() // resets login form
  },

  render : function() {
    if (!localStorage.token) { // renders login form when not logged in
      return (
        <div id="login">
          <form ref="form" onSubmit={this.handleSubmit}>
            <h1 className="header">Welcome back to punnett²!</h1>
            <input id="loginUsername" type="text" ref="username" placeholder="username"/>
            <input id="loginPassword" type="password" ref="password" placeholder="password" />
            <button id="loginSubmit" type="submit">login</button>
            <div id="loginError">{this.state.error}</div>
            <Link id="scoresHome" to="/signup">Signup</Link>
          </form>
        </div>
      )
    } else { // renders page if already logged in
      return (
        <div id="login">
          <h3 className="header">You are already signed in!</h3>
          <Link id="scoresHome" to="/home">Home</Link>
        </div>
      )
    }
  }
})

module.exports = Login;
