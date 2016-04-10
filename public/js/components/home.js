const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

const Home = React.createClass({

  contextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func,
    router: React.PropTypes.object
  },

  render : function() {
    return (
      <div id="home">
        <div id="header">punnett²</div>
        <Link className="play" to="/play">Play</Link>
        <Link className="scores" to="/scores">Scores</Link>
        <Link className="instructions" to="/instructions">Instructions</Link>
        <Link id="settings" to="/settings"></Link>
      </div>
    )
  }
})

module.exports = Home;
