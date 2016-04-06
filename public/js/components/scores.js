const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Setting = require('./setting.js')
const Home = require('./home.js')

const Scores = React.createClass({

  contextTypes: {
    score: React.PropTypes.array,
    showScore: React.PropTypes.func
  },

  componentDidMount : function() {
    $.get({
      url : '/highscores'
    })
    .done((data)=>{
      console.log('data',data);
      console.log(this.context.score);
      // this.context.showScore(data)
    })
  },

  render : function() {
    return (
      <div id="scores">
      <h1> Player Scores </h1>
      {this.context.score}
      <Link to="/home">Menu</Link>
      </div>
    )
  }
})

module.exports = Scores;
