const $     = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

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

  showScore : function(value) {
    this.setState({score: value});
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
    var usernameArray = [];
    var scoreArray = [];
    this.state.score.forEach((el)=>{
      usernameArray.push(<li>{el.username}</li>)
      scoreArray.push(<li>{el.score}</li>)
    })
    return (
      <div id="scores">
        <h1 className="header">High Scores</h1>
        <div id="usernameArray"><strong>Username</strong>{usernameArray}</div>
        <div id="scoreArray"><strong>Scores</strong>{scoreArray}</div>
        <Link id="scoresHome" to="/home">Home</Link>
      </div>
    )
  }
})

module.exports = Scores;
