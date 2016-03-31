const React = require('react');

const Login = React.createClass({
  handleSubmit : function(event) {
    event.preventDefault();
    console.log('handleSubmit');
  },

  handleSignup : function(event) {
    event.preventDefault();
    console.log('handleSignup');
  },

  render : function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 id="header">punnett²</h1>
        <input id="signupUsername" type="text" ref="username" placeholder="username"/>
        <input id="signupPassword" type="password" ref="pass" placeholder="password" /><br />
        <button type="submit">login</button>
        <a onClick={this.handleSignup}>signup</a>
      </form>
    )
  }
})

module.exports = Login;
