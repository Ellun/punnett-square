const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

const Gg = React.createClass({

  render : function() {
    return (
      <div>
        <h1> You are forever a loser </h1>
        <div className="gg">
          <Link className="ggPlay" to="/play">Play</Link>
          <Link className="ggMenu" to="/home">Menu</Link>
        </div>
      </div>
    )
  }
})

module.exports = Gg;
