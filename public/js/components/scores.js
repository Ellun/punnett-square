const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Setting = require('./setting.js')
const Home = require('./home.js')

const Scores = React.createClass({

  getInitialState : function() {
    return {
      score : []
    }
  },

  childContextTypes: {
    score: React.PropTypes.array,
    showScore: React.PropTypes.func,
  },

  getChildContext: function(){
    return {
      score : this.state.score,
      showScore : this.showScore
    }
  },

  componentDidMount : function() {
    $.ajax({
      url : '/score/highscores',
      type : 'get',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
      }
    })
    .done((data)=>{
      this.setState({score: data})
    })
  },

  render : function() {
    var array = [];
    this.state.score.forEach((el)=>{
      array.push(<li><strong>Player:</strong> {el.username},  <strong>Score:</strong> {el.score}</li>)
    })
    return (
      <div id="scores">
      <h1> Player Scores </h1>
      {array}
      <Link to="/home">Menu</Link>
      </div>
    )
  }
})

module.exports = Scores;
