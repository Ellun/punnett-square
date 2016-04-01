const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Organisms = React.createClass({

  makeOrganisms : function() {

    function gene() {
      return Math.floor(Math.random() * 2) + 1 ;
    }

    function Organism() {
      this.hair = [gene(),gene()];
      this.fat = [gene(),gene()];
      this.land = [gene(),gene()];
      this.water = [gene(),gene()];
      this.sweat = [gene(),gene()];
      this.health = [gene(),gene()];
    }

    while (this.state.organisms.length < 10) {
      var organism = new Organism();
      var $organism = $('<div>');
      $organism.addClass('organisms')
      $organism.attr('hair',organism.hair)
      $organism.attr('fat',organism.fat)
      $organism.attr('land',organism.land)
      $organism.attr('water',organism.water)
      $organism.attr('sweat',organism.sweat)
      $organism.attr('health',organism.health)
      this.state.organisms.push($organism);
      $('#field').append($organism)
    }
  },

  componentDidMount : function() {
    if (this.state.organisms.length === 0) {
      this.makeOrganisms()
    }
  },

  getInitialState : function() {
    return {
      organisms : []
    }
  },

  render : function() {
    return (
      <div id="field">

      </div>
    )
  }
})

module.exports = Organisms;
