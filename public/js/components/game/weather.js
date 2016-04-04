const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Weather = React.createClass({

  contextTypes: {
    turn: React.PropTypes.number,
    showTurn: React.PropTypes.func
  },

  updateWeather : function() {
    var value = this.context.turn
    switch (value) {
      case 1:
        this.state.backgroundImage = 'url(' + "../../../images/bluesky.png" + ')';
        break;
      case 5:
        this.state.backgroundImage = 'url(' + "../../../images/cold.png" + ')';
        break;
      case 10:
        this.state.backgroundImage = 'url(' + "../../../images/sunny.png" + ')';
        break;
      case 15:
        this.state.backgroundImage = 'url(' + "../../../images/bluesky.png" + ')';
        break;
      default:
    }
    this.setState({backgroundImage:this.state.backgroundImage})
  },

  getInitialState : function() {
    return {
      backgroundImage : 'url(' + "../../../images/bluesky.png" + ')'
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(this.updateWeather, 50);
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
