const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Organisms = React.createClass({
  contextTypes: {
    stats: React.PropTypes.array,
    showStats: React.PropTypes.func,
  },

  makeOrganisms : function() {

    function gene() {
      return Math.floor(Math.random() * 2) + 1 ;
    }

    function locationLeft() {
      return Math.floor(Math.random() * 80) + 10 ;
    }

    function locationTop() {
      return Math.floor(Math.random() * 100) + 1 ;
    }

    function time() {
      return Math.floor(Math.random() * 8000) + 4000 ;
    }

    function Organism() {
      this.hair = [gene(),gene()];
      this.fat = [gene(),gene()];
      this.land = [gene(),gene()];
      this.water = [gene(),gene()];
      this.sweat = [gene(),gene()];
      this.health = [gene(),gene()];
    }

    function hustle(){
      var loop = 0;
      while (loop < 500) {
        $organism.animate({'left': locationLeft() + "%", 'top': locationTop() + "px"}, time())
        loop ++
      }
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
      $organism.css('top', locationTop() + "px")
      $organism.css('left', locationLeft() + "%")
      this.state.organisms.push($organism);
      $('#field').append($organism)
      hustle();

      $organism.click((event) => {
        var target = event.target
        var data = [
          'hair :' + target.attributes[1].value + ' ',
          'fat :' + target.attributes[2].value + ' ',
          'land :' + target.attributes[3].value + ' ',
          'water :' + target.attributes[4].value + ' ',
          'sweat :' + target.attributes[5].value + ' ',
          'health :' + target.attributes[6].value
        ]
        this.context.showStats(data)
      })
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
