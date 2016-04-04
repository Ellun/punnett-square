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

  makeOrganisms : function(i, mode) {
    function rando(max,min) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var gene = (mode,x,y) => {
      if (mode == "new") {
        var array = [];
        for (var i = 0; i < 2; i++) {
          var value = Math.floor(Math.random() * 3) + 1 ;
          array.push(value);
        }
        return array;
      } else {
        var value = Math.floor(Math.random() * 4) + 1 ;
        console.log('this is context',this.context.punnett1);
        switch (value) {
          case 1:
            return [this.context.punnett1[x], this.context.punnett2[x]];
            break;
          case 2:
            return [this.context.punnett1[x], this.context.punnett2[y]];
            break;
          case 3:
            return [this.context.punnett1[y], this.context.punnett2[x]];
            break;
          case 4:
            return [this.context.punnett1[y], this.context.punnett2[y]];
            break;
        }
      }
    }

    function Organism() {
      this.hair = gene(mode,0,1);
      this.fat = gene(mode,2,3);
      this.defense = gene(mode,4,5);
      this.water = gene(mode,6,7);
      this.bodyType = gene(mode,8,9);
      this.health = 100 ;
    }

    function hustle($organism){
      var loop = 0;
      while (loop < 500) {
        $organism.animate({'left': rando(90, 1) + "%", 'top': rando(230,225) + "px"}, rando(8000,4000))
        loop ++
      }
    }

    var organism = new Organism();
    var $organism = $('<div>');
    $organism.addClass('organisms')
    $organism.attr('id','organisms' + i)
    $organism.attr('hair',organism.hair)
    $organism.attr('fat',organism.fat)
    $organism.attr('defense',organism.defense)
    $organism.attr('water',organism.water)
    $organism.attr('bodyType',organism.bodyType)
    if ($organism.attr('bodyType') == [2,2]) {
      $organism.css('background-image', 'url(../../../images/icedude.png)')
    } else if ($organism.attr('bodyType') == [3,3]) {
      $organism.css('background-image', 'url(../../../images/lavadude.png)')
    }
    $organism.attr('health',organism.health)
    $organism.css('top', rando(230,225) + "px")
    $organism.css('left', rando(90, 1) + "%")
    this.state.organisms.push($organism);
    $('#habitat').append($organism)
    var $helmet = $('<div>');
    $helmet.addClass('helmet')
    if ($organism.attr('defense') == [1,1]) {
      $organism.append($helmet)
    }
    $organism.draggable();
    hustle($organism);

    $organism.click((event) => {
      var target = event.currentTarget;
      var id = target.attributes[1].value
      $("#" + id ).stop(true);
      $('#habitat').droppable({drop: function(){
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
        'defense :' + target.attributes[4].value + ' ',
        'water :' + target.attributes[5].value + ' ',
        'bodyType :' + target.attributes[6].value + ' ',
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
  },

  handleBaby : function() {
    this.makeOrganisms($.now(),'woot')
  },

  componentDidMount : function() {
    if (this.state.organisms.length === 0) {
      for (var i = 0; i < 10; i++) {
        this.makeOrganisms($.now(),"new")
      }
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
        <button id="babies" onClick={this.handleBaby} type="submit">Procreate</button>
      </div>
    )
  }
})

module.exports = Organisms;
