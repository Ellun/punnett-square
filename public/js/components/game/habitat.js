const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')
const Organisms = require('./organisms.js')

const Habitat = React.createClass({

  contextTypes: {
    turn: React.PropTypes.number,
    showTurn: React.PropTypes.func,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func
  },

  updateHabitat : function() {
    var value = Math.floor(Math.random() * 3) + 1;
    var background = this.state.backgroundImage;
    switch (value) {
      case 1:
        background = 'url(' + "../../../images/greenbackground.png" + ')';
        this.state.habitat = "field"
        break;
      case 2:
        background = 'url(' + "../../../images/iceworld.png" + ')';
        this.state.habitat = "dry";
        break;
      case 3:
        background = 'url(' + "../../../images/landosand.png" + ')';
        this.state.habitat = "ice"
        break;
      default:
        break;
    }
    this.setState({backgroundImage:background, habitat:this.state.habitat})
  },

  getInitialState : function() {
    return {
      backgroundImage : 'url(' + "../../../images/greenbackground.png" + ')',
      habitat : "field"
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(() => {
      if (this.context.habitat == true) {
        this.updateHabitat()
        this.context.showHabitat(false)
      }
    }, 100);
  },

  render : function() {
    var style = {
      backgroundImage: this.state.backgroundImage
    }
    return (
      <div style={style} id="habitat">
        <Organisms/>
      </div>
    )
  }
})

module.exports = Habitat;
