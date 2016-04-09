const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')
const Organisms = require('./organisms.js')

const Habitat = React.createClass({

  componentDidMount : function() {
    var intervalID = window.setInterval(() => {
      if (this.context.habitat == true) {
        this.updateHabitat()
        this.context.showHabitat(false)
      }
    }, 100);
  },

  contextTypes: {
    turn: React.PropTypes.number,
    showTurn: React.PropTypes.func,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func,
    habitatImage : React.PropTypes.string,
    habitatBackground : React.PropTypes.func
  },

  updateHabitat : function() {
    if (this.context.turn % 16 == 0 || this.context.turn % 31 == 0) {
      var value = Math.floor(Math.random() * 2) + 2;
    } else {
      var value = Math.floor(Math.random() * 3) + 1;
    }
    var background = this.context.habitatImage;
    switch (value) {
      case 1:
        background = 'url(' + "../../../images/greenbackground.png" + ')';

        break;
      case 2:
        background = 'url(' + "../../../images/iceworld.png" + ')';

        break;
      case 3:
        background = 'url(' + "../../../images/landosand.png" + ')';

        break;
      default:
        break;
    }
    this.context.habitatBackground(background)
  },

  render : function() {
    var style = {
      backgroundImage: this.context.habitatImage
    }
    return (
      <div style={style} id="habitat">
        <Organisms/>
      </div>
    )
  }
})

module.exports = Habitat;
