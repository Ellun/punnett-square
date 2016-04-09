const $     = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

/* component to update password */
const UpdatePassword = React.createClass({

  getInitialState : function() {
    return {
      error : ''
    }
  },

  contextTypes: {
    router : React.PropTypes.object
  },

  handleSubmit : function(event) {
    event.preventDefault(); // prevents page from refreshing

    const currentPass = this.refs.currentPassword.value;
    const newPass = this.refs.newPassword.value;
    const confirmPass = this.refs.confirmPassword.value;
    let error = 'passwords did not match'

    let data = {
      currentPass : currentPass,
      newPass : newPass
    }

    if (newPass != confirmPass) {
      this.setState({error:error})
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
      .done((data) => {
        if (data == 'error') { // error returned from server side
          this.setState({error:error});
        } else {
          this.context.router.replace('/home')
        }
      })
    }
  },

  render : function() {
    return (
      <div id="login">
        <form onSubmit={ this.handleSubmit }>
          <h3 className="header">Update Password</h3>
          <input id="topInput" type="password" ref="currentPassword" placeholder="current password"/>
          <input id="middleInput" type="password" ref="newPassword" placeholder="new password"/>
          <input id="botInput" type="password" ref="confirmPassword" placeholder="confirm password" />
          <button id="signupSubmit" type="submit">Confirm</button>
          <div id="loginError">{this.state.error}</div>
          <Link id="scoresHome" to="/home">Menu</Link>
        </form>
      </div>
    )
  }
})

module.exports = UpdatePassword;
