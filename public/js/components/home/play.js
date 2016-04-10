const React = require('react'); // requires React module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Weather = require('../game/weather.js')
const Habitat = require('../game/habitat.js')
const Stats   = require('../game/stats.js')
const Punnett = require('../game/punnett.js')

const Play = React.createClass({

  getInitialState : function () {
    return {
      stats1 : [],
      stats2 : [],
      punnett1 : [],
      punnett2 : [],
      score : [],
      turn : 1,
      weather : false,
      habitat : false,
      weatherImage : 'url(' + "../../../images/bluesky.png" + ')',
      habitatImage : 'url(' + "../../../images/greenbackground.png" + ')'
    }
  },

  childContextTypes: {
    stats1: React.PropTypes.array,
    showStats1: React.PropTypes.func,
    stats2: React.PropTypes.array,
    showStats2: React.PropTypes.func,
    punnett1: React.PropTypes.array,
    showPunnett1: React.PropTypes.func,
    punnett2: React.PropTypes.array,
    showPunnett2: React.PropTypes.func,
    turn: React.PropTypes.number,
    showTurn: React.PropTypes.func,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func,
    weatherImage : React.PropTypes.string,
    weatherBackground : React.PropTypes.func,
    habitatImage : React.PropTypes.string,
    habitatBackground : React.PropTypes.func,
  },

  getChildContext: function(){
    return {
     stats1: this.state.stats1,
     showStats1: this.showStats1,
     stats2: this.state.stats2,
     showStats2: this.showStats2,
     punnett1: this.state.punnett1,
     showPunnett1: this.showPunnett1,
     punnett2: this.state.punnett2,
     showPunnett2: this.showPunnett2,
     turn: this.state.turn,
     showTurn: this.showTurn,
     weather : this.state.weather,
     showWeather : this.showWeather,
     habitat : this.state.habitat,
     showHabitat : this.showHabitat,
     weatherImage : this.state.weatherImage,
     weatherBackground : this.weatherBackground,
     habitatImage : this.state.habitatImage,
     habitatBackground : this.habitatBackground
    }
  },

  showStats1 : function(value) {
    this.setState({stats1: value});
  },

  showStats2 : function(value) {
    this.setState({stats2: value});
  },

  showPunnett1 : function(value) {
    this.setState({punnett1: value});
  },

  showPunnett2 : function(value) {
    this.setState({punnett2: value});
  },

  showTurn : function(value) {
    this.setState({turn: value});
  },

  showWeather : function(value) {
    this.setState({weather: value});
  },

  showHabitat: function(value) {
    this.setState({habitat: value});
  },

  weatherBackground: function(value) {
    this.setState({weatherImage: value});
  },

  habitatBackground: function(value) {
    this.setState({habitatImage: value});
  },

  render : function() {
    if (localStorage.token) {
      return (
        <div id="gameContainer">
          <Weather/>
          <Habitat/>
          <Stats />
          <Punnett />
        </div>
      )
    } else {
      return (
        <div id="nope">
          <h1>Login!</h1>
          <Link to="/login">Login</Link>
        </div>
      )
    }
  }
})

module.exports = Play;
