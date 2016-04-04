const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Weather = React.createClass({

  updateWeather : function() {
    var value = Math.floor(Math.random() * 4) + 1 ;
    switch (value) {
      case 1:
        this.state.backgroundImage = 'url(' + "../../../images/bluesky.png" + ')';
        break;
      case 2:
        this.state.backgroundImage = 'url(' + "../../../images/bluesky.png" + ')';
        break;
      case 3:
        this.state.backgroundImage = 'url(' + "../../../images/bluesky.png" + ')';
        break;
      case 4:
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
    var intervalID = window.setInterval(this.updateWeather, 500);
  },

  render : function() {
    var style = {
      backgroundImage: this.state.backgroundImage
    }
    return (
      <div style={style} id="weather"></div>
    )
  }
})

module.exports = Weather;
