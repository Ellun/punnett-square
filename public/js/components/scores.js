const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Setting = require('./setting.js')
const Home = require('./home.js')

const Scores = React.createClass({

  componentDidMount : function() {
    $.get({
      url : '/highscores'
    })
    .done((data)=>{
      
    })
  },

  render : function() {
    return (
      <div id="scores">
      <h1> Player Scores </h1>
      <Link to="/home">Menu</Link>
      </div>
    )
  }
})

module.exports = Scores;
