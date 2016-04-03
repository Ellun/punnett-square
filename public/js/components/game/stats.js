const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')
const Setting = require('../setting.js')

const Stats = React.createClass({
  contextTypes: {
    stats1: React.PropTypes.array,
    showStats1: React.PropTypes.func,
    stats2: React.PropTypes.array,
    showStats2: React.PropTypes.func
  },

  render : function() {
    return (
      <div id="stats">
        <Link id="settings" to="/settings"></Link>
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
