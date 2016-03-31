const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, ank, Redirect, Navigation, RouteHandler } from 'react-router'
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
        <ul>
          <li><a onClick={this.handleUpdatePassword}>Update Password</a></li>
          <li><a onClick={this.handleLogout}>Logout</a></li>
          <li><a onClick={this.handleDelete}>Delete Account</a></li>
        </ul>
      </div>
    )
  }
})

module.exports = Setting;
