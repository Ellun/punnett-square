const $         = require('jquery'); // requires jQuery npm module
const React     = require('react'); // requires React npm module
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play      = require('../play.js') // links to Play component
const Organisms = require('./organisms.js') // links to Organisms component

/* Habitat component will update the habitat background image */
const Habitat = React.createClass({

  contextTypes: {
    turn: React.PropTypes.number,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func,
    habitatImage : React.PropTypes.string,
    habitatBackground : React.PropTypes.func
  },

  componentDidMount : function() { // launches on render
    /* Checks to see if habitat needs to be updated */
    let intervalID = window.setInterval(() => {
      if (this.context.habitat) {
        this.selectHabitat()
        this.context.showHabitat(false)
      }
    }, 200);
  },

  selectHabitat : function() {
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
    this.updateHabitat(value)
  },

    /* updates habitat background */
    updateHabitat : function(value) {
      let background = this.context.habitatImage;
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
      }
      /* sets the background to new habitat */
      this.context.habitatBackground(background)
    },

  render : function() {
    let style = {
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
