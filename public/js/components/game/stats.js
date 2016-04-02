const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Stats = React.createClass({
  contextTypes: {
    stats: React.PropTypes.array,
    showStats: React.PropTypes.func,
  },

  render : function() {
    return (
      <div id="stats">
        {this.context.stats}
      </div>
    )
  }
})

module.exports = Stats;
