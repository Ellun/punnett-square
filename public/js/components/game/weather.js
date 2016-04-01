const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Weather = React.createClass({

  updateWeather : function() {
    var value = Math.floor(Math.random() * 4) + 1 ;
    switch (value) {
      case 1:
        this.state.color = "#00CCFF";
        break;
      case 2:
        this.state.color = "red";
        break;
      case 3:
        this.state.color = "purple";
        break;
      case 4:
        this.state.color = "orange";
        break;
      default:
    }
    this.setState({color:this.state.color})
  },

  getInitialState : function() {
    return {
      color : "#00CCFF"
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(this.updateWeather, 500);
  },

  render : function() {
    var style = {
      backgroundColor: this.state.color
    }
    return (
      <div style={style} id="weather"></div>
    )
  }
})

module.exports = Weather;
