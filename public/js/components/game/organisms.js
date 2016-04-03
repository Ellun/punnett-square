const $ = require('jquery');
require('jquery-ui')
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')

const Organisms = React.createClass({
  contextTypes: {
    stats1: React.PropTypes.array,
    showStats1: React.PropTypes.func,
    stats2: React.PropTypes.array,
    showStats2: React.PropTypes.func,
    punnett1: React.PropTypes.array,
    showPunnett1: React.PropTypes.func,
    punnett2: React.PropTypes.array,
    showPunnett2: React.PropTypes.func
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
      this.health = 100 ;
    }

    function hustle($organism){
      var loop = 0;
      while (loop < 500) {
        $organism.animate({'left': locationLeft() + "%", 'top': locationTop() + "px"}, time())
        loop ++
      }
    }

    for (var i = 0; i < 10; i++) {
      var organism = new Organism();
      var $organism = $('<div>');
      $organism.addClass('organisms')
      $organism.attr('id','organisms' + i)
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
      $organism.draggable();
      hustle($organism);

      $organism.click((event) => {
        var target = event.target;
        var id = target.attributes[1].value
        console.log(target.attributes[2].value,target.attributes[2].value[0],target.attributes[2].value[2]);
        $("#" + id ).finish();
        $('#field').droppable({drop: function(){
          hustle($("#" + id ));
        }});

        var data = [
          target.attributes[2].value[0],
          target.attributes[2].value[2],
          target.attributes[3].value[0],
          target.attributes[3].value[2],
          target.attributes[4].value[0],
          target.attributes[4].value[2],
          target.attributes[5].value[0],
          target.attributes[5].value[2],
          target.attributes[6].value[0],
          target.attributes[6].value[2]
        ]

        var dataText = [
          'hair :' + target.attributes[2].value + ' ',
          'fat :' + target.attributes[3].value + ' ',
          'land :' + target.attributes[4].value + ' ',
          'water :' + target.attributes[5].value + ' ',
          'sweat :' + target.attributes[6].value + ' ',
          'health :' + target.attributes[7].value
        ]

        $('#parent1').droppable({drop:()=>{
          this.context.showStats1(dataText)
          this.context.showPunnett1(data)
        }});
        $('#parent2').droppable({drop:()=>{
          this.context.showStats2(dataText)
          this.context.showPunnett2(data)
        }});
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
