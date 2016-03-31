const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../../script.js')
const Setting = require('../setting.js')
const Home = require('../home.js')

const UpdatePassword = React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit : function( event ) {
  event.preventDefault();

  const currentPass = this.refs.currentPassword.value;
  const newPass = this.refs.newPassword.value;
  const confirmPass =this.refs.confirmPassword.value;

  let data = {
    currentPass : currentPass,
    newPass : newPass
  }

  if ( newPass != confirmPass ) {
    alert('You failure, the passwords do not match')
  } else {
    $.ajax(
      {
        url : '/users/update',
        data : data,
        type: 'put',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
        }
      }
    )
    .done(() => {
      this.context.router.replace('/home')
    })
  }
},

  render : function() {
    return (
      <div className="setting">
        <form onSubmit={ this.handleSubmit }>
          <h3>Update Password</h3>
          <label><input id="currentPassword" type="password" ref="currentPassword" placeholder="current password"/></label>
          <label><input id="newPassword" type="password" ref="newPassword" placeholder="new password"/></label>
          <label><input id="confirmPassword" type="password" ref="confirmPassword" placeholder="confirm password" /></label><br />
          <button type="submit">confirm</button>
        </form>
      </div>
    )
  }
})

module.exports = UpdatePassword;
