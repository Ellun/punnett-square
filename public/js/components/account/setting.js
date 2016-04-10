const $     = require('jquery'); // requires jQuery module
const React = require('react'); // requires React module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

const Setting = React.createClass({

  contextTypes: {
    setLoggedInTrue : React.PropTypes.func,
    router : React.PropTypes.object
  },

  /* logs user out */
  handleLogout : function(event) {
    event.preventDefault();
    delete localStorage.token;
    this.context.setLoggedInTrue(false);
    this.context.router.replace('/login');
  },

  /* redirects to the password update page */
  handleUpdatePassword : function(event) {
    event.preventDefault();
    this.context.router.replace('/updatePassword');
  },

  /* deletes user */
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
      delete localStorage.token;
      this.context.setLoggedInTrue(false);
      this.context.router.replace('/login');
    })
  },

  render : function() {
    return (
      <div id="login">
      <h1 className="header">Setting</h1>
          <div id="topInput"><a onClick={this.handleUpdatePassword}>Update Password</a></div>
          <div id="middleInput"><a onClick={this.handleLogout}>Logout</a></div>
          <div id="botInput"><a onClick={this.handleDelete}>Delete Account</a></div>
          <Link id="scoresHome" to="/home">Home</Link>
      </div>
    )
  }
})

module.exports = Setting;
