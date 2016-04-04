const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')
const Organisms = require('./organisms.js')

const Habitat = React.createClass({

  contextTypes: {
    turn: React.PropTypes.number,
    showTurn: React.PropTypes.func
  },

  updateHabitat : function() {
    var value = this.context.turn
    switch (value) {
      case 1:
        this.state.backgroundImage = 'url(' + "../../../images/greenbackground.png" + ')';
        this.state.habitat = "field"
        break;
      case 5:
        this.state.backgroundImage = 'url(' + "../../../images/iceworld.png" + ')';
        this.state.habitat = "dry";
        break;
      case 10:
        this.state.backgroundImage = 'url(' + "../../../images/landosand.png" + ')';
        this.state.habitat = "ice"
        break;
      case 15:
        this.state.backgroundImage = 'url(' + "../../../images/greenbackground.png" + ')';
        this.state.habitat = "water"
        break;
      default:
    }
    this.setState({backgroundImage:this.state.backgroundImage, habitat:this.state.habitat})
  },

  getInitialState : function() {
    return {
      backgroundImage : 'url(' + "../../../images/greenbackground.png" + ')',
      habitat : "field"
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(this.updateHabitat, 50);
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
