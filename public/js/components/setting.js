const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Login = require('./login/login.js')
const Signup = require('./login/signup.js')

const Setting = React.createClass({

  contextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func,
    router: React.PropTypes.object
  },

  handleLogout : function(event) {
    event.preventDefault();
    delete localStorage.token
    this.context.setLoggedInTrue(false);
    this.context.router.replace('/login')
  },

  handleUpdatePassword : function(event) {
    event.preventDefault();
    this.context.router.replace('/updatePassword')
  },

  handleDelete : function(event) {
    event.preventDefault();
    $.ajax(
      {
        url : '/users/delete',
        method : "delete",
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.token );
        }
    })
    .done(() => {
      delete localStorage.token
      this.context.setLoggedInTrue(false);
      this.context.router.replace('/login')
    })
  },

  render : function() {
    return (
      <div className="setting">
      <h1>Setting</h1>
          <div id="updatePass"><a onClick={this.handleUpdatePassword}>Update Password</a></div>
          <div id="logout"><a onClick={this.handleLogout}>Logout</a></div>
          <div id="deleteAccount"><a onClick={this.handleDelete}>Delete Account</a></div>
          <Link id="scoresHome" to="/home">Menu</Link>
      </div>
    )
  }
})

module.exports = Setting;
