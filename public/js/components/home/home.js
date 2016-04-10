const React = require('react'); // requires React module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

/* Home component */
const Home = React.createClass({

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
