const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

const Stats = React.createClass({
  
  contextTypes: {
    stats1: React.PropTypes.array,
    stats2: React.PropTypes.array
  },

  render : function() {
    return (
      <div id="stats">
        <Link id="settings" to="/settings"></Link>
        <Link id="toHome" to="/home">Menu</Link>
        <div id="stats1">
          {this.context.stats1}
        </div>
        <div id="stats2">
          {this.context.stats2}
        </div>
        <div id="parent1">
        </div>
        <div id="parent2">
        </div>
      </div>
    )
  }
})

module.exports = Stats;
