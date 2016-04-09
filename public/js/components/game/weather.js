const $     = require('jquery'); // requires jQuery npm module
const React = require('react'); // requires React npm module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play  = require('../play.js'); // links to Play component

/* Weather component will update the weather background image */
const Weather = React.createClass({

  componentDidMount : function() { // launches on render
  /* Checks to see if weather needs to be updated */
    let intervalID = window.setInterval(() => {
      if (this.context.weather) {
        this.selectWeather()
        this.context.showWeather(false)
      }
    }, 200);
  },

  contextTypes: {
    turn : React.PropTypes.number,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    weatherImage : React.PropTypes.string,
    weatherBackground : React.PropTypes.func
  },

  /* randomly selects a new weather */
  selectWeather : function() {
    let value;

    /* selects random value for switch function */
    function rando(min,max) {
      return value = Math.floor(Math.random() * max) + min;
    }

    if (this.context.turn % 3 == 0) { // ensures harsher rounds
      rando(2,2);
    } else {
      rando(1,3);
    }
    this.updateWeather(value)
  },

  /* updates weather background */
  updateWeather : function(value) {
    let background = this.context.weatherImage;
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
    }
    /* sets the background to new weather */
    this.context.weatherBackground(background)
  },

  render : function() {
    let style = {
      backgroundImage: this.context.weatherImage
    }
    return (
      <div style={style} id="weather">
        <h3>Round: {this.context.turn}</h3>
      </div>
    )
  }
})

module.exports = Weather;
