const $     = require('jquery'); // requires jQuery module
const React = require('react'); // requires React module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

/* signup component */
const Signup = React.createClass({

  getInitialState : function() {
    return {
      error : ''
    }
  },

  contextTypes: {
    setLoggedInTrue : React.PropTypes.func,
    router : React.PropTypes.object
  },

  /* when signup button is hit */
  handleSubmit : function(event) {
    event.preventDefault(); // prevents page from refreshing
    const username = this.refs.username.value
    const password = this.refs.password.value
    const confirmPass = this.refs.confirmPass.value
    let error = 'Oops, please check your username or password'

    if (password != confirmPass) { // if the entered passwords do not match
      this.setState({error:'Oops, passwords did not match'})
    } else {
      $.post('/users',{
        username: username,
        password: password
      })
      .done((data) => {
        if (data.agent == 'error') { // if the username is already taken
          this.setState({error:'that username already exists, please re-select'})
        } else { // if the account creation is successful
          localStorage.token = data.token;
          this.context.setLoggedInTrue(true);
          this.context.router.replace('/home')
        }
      })
    }
    this.refs.form.reset() // resets signup form
  },

  render : function() {
    if (!localStorage.token) { // renders this view if you are not signed in
      return (
        <div id="login">
          <form ref="form" onSubmit={this.handleSubmit}>
            <h1 className="header">Welcome to punnett²!</h1>
            <input id="loginUsername" type="text" ref="username" placeholder="username"/>
            <input id="loginPassword" type="password" ref="password" placeholder="password" />
            <input id="confirmPassword" type="password" ref="confirmPass" placeholder="confirm password" />
            <button id="signupSubmit" type="submit">Signup</button>
            <div id="loginError">{this.state.error}</div>
            <Link id="scoresHome" to="/login">Login</Link>
          </form>
        </div>
      )
    } else { // renders this view if you are signed in
      return (
        <div id="login">
          <h3>You are already signed in!</h3>
          <Link id="scoresHome" to="/home">Home</Link>
        </div>
      )
    }
  }
})

module.exports = Signup;
