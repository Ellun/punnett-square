const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Weather = React.createClass({

  contextTypes: {
    turn : React.PropTypes.number,
    showTurn : React.PropTypes.func,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func
  },

  updateWeather : function() {
    var value = Math.floor(Math.random() * 3) + 1;
    var background = this.state.backgroundImage;
    switch (value) {
      case 1:
        background = 'url(' + "../../../images/bluesky.png" + ')';
        break;
      case 2:
        background = 'url(' + "../../../images/cold.png" + ')';
        break;
      case 3:
        background = 'url(' + "../../../images/sunny.png" + ')';
        break;
      default:
        break;
    }
    this.setState({backgroundImage:background})
  },

  getInitialState : function() {
    return {
      backgroundImage : 'url(' + "../../../images/bluesky.png" + ')'
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(() => {
      if (this.context.weather == true) {
        this.updateWeather()
        this.context.showWeather(false)
      }
    }, 100);
  },

  render : function() {
    var style = {
      backgroundImage: this.state.backgroundImage
    }
    return (
      <div style={style} id="weather">
        <h3>Round: {this.context.turn}</h3>
      </div>
    )
  }
})

module.exports = Weather;
