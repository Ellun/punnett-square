const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Gg = React.createClass({
  render : function() {
    return (
      <h1> You are forever a loser </h1>
    )
  }
})

module.exports = Gg;
