const $ = require('jquery');
require('jquery-ui')
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js');
const Weather = require('./weather.js');
const Habitat = require('./habitat.js');

const Organisms = React.createClass({
  contextTypes: {
    stats1: React.PropTypes.array,
    showStats1: React.PropTypes.func,
    stats2: React.PropTypes.array,
    showStats2: React.PropTypes.func,
    punnett1: React.PropTypes.array,
    showPunnett1: React.PropTypes.func,
    punnett2: React.PropTypes.array,
    showPunnett2: React.PropTypes.func,
    turn: React.PropTypes.number,
    showTurn: React.PropTypes.func,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func,
    weatherImage : React.PropTypes.string,
    habitatImage : React.PropTypes.string,
  },

  makeOrganisms : function(i, mode) {
    function rando(max,min) {
      return Math.floor(Math.random() * max) + min;
    }

    var gene = (mode,x,y) => {
      if (mode == "new") {
        var array = [];
        for (var i = 0; i < 2; i++) {
          var value = rando(3,1);
          array.push(value);
        }
        return array;
      } else {
        var value = rando(4,1);
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
        $organism.animate({'left': rando(90, 1) + "%", 'top': rando(5,225) + "px"}, rando(8000,4000))
        loop ++
      }
    }

    var organism = new Organism();
    var $organism = $('<div>');
    var $floatingStats = $('<div>');
    $floatingStats.addClass('floatingStats')
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
    $organism.css('top', rando(5,225) + "px")
    $organism.css('left', rando(90, 1) + "%")
    this.state.organisms.push($organism);
    $('#habitat').append($organism)
    // var $helmet = $('<div>');
    // $helmet.addClass('helmet')
    // if ($organism.attr('defense') == [1,1]) {
    //   $organism.append($helmet)
    // }
    $organism.draggable();
    hustle($organism);

    $organism.hover((event) => {
      var $target = event.currentTarget;
      $('.floatingStats').text('Traits:' + $target.attributes[6].value + ', Health:' + $target.attributes[7].value);
    },
      () => {
        $('.floatingStats').empty();
      }
    )

    $organism.mousedown((event) => {
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

      // var dataText = [
      //   'hair :' + target.attributes[2].value + ' ',
      //   'fat :' + target.attributes[3].value + ' ',
      //   'defense :' + target.attributes[4].value + ' ',
      //   'water :' + target.attributes[5].value + ' ',
      //   'bodyType :' + target.attributes[6].value + ' ',
      //   'health :' + target.attributes[7].value
      // ]

      var dataText = [
        'Body Type :' + target.attributes[6].value + ' ',
        'health :' + target.attributes[7].value
      ]

      $('#parent1').droppable({drop:()=>{
        this.context.showStats1(dataText)
        this.context.showPunnett1(data)
      }})
      $('#parent2').droppable({drop:()=>{
        this.context.showStats2(dataText)
        this.context.showPunnett2(data)
      }});
    })
  },

  handleBaby : function() {
    var organisms = this.state.organisms
    this.context.showTurn(this.context.turn + 1)
    if (this.context.turn % 5 == 0) {
      this.context.showWeather(true);
      this.context.showHabitat(true);
    }
    for (var i = 0; i < this.state.organisms.length; i++) {
      var coldWeather = 'url(' + "../../../images/cold.png" + ')';
      var coldHabitat = 'url(' + "../../../images/iceworld.png" + ')';
      var hotWeather = 'url(' + "../../../images/sunny.png" + ')';
      var hotHabitat = 'url(' + "../../../images/landosand.png" + ')';
      var weather = this.context.weatherImage;
      var habitat = this.context.habitatImage;
      var organismBody = organisms[i][0].attributes[6].value

      // Damage caused by the weather
      if (((organismBody == [3,3]) && (weather == coldWeather)) || //checks lavagolems
          ((organismBody == [2,2]) && (weather == hotWeather))     //checks icegolems
      ){
        var weatherDMGs = 25
      } else if (((organismBody != [2,2]) && (weather == coldWeather)) || //accounts for reg golems
                 ((organismBody != [3,3]) && (weather == hotWeather))
        ){
        var weatherDMGs = 20
      } else {
        weatherDMGs = 0 //if they golem matches the environment, no additional damage is delt
      }

      // Damage cause by the habitat
      if (((organismBody == [3,3]) && (habitat == coldHabitat)) || //checks lavagolems
          ((organismBody == [2,2]) && (habitat == hotHabitat))     //checks icegolems
      ){
        var habitatDMGs = 25
      } else if (((organismBody != [2,2]) && (habitat == coldHabitat)) || //accounts for reg golems
                 ((organismBody != [3,3]) && (habitat == hotHabitat))
        ){
        var habitatDMGs = 20
      } else {
        habitatDMGs = 0 //if they golem matches the environment, no additional damage is delt
      }

      var health = 10 + weatherDMGs + habitatDMGs;
      var $health = this.state.organisms[i][0].attributes[7].value - health
      if ($health <= 0) {
        this.state.organisms[i].remove()
        this.state.organisms.splice(i,1)
        i --;
        if (this.state.organisms.length <= 1) {
          alert("You Lost")
          this.loser();
          break;
        }
      } else {
        this.state.organisms[i][0].attributes[7].value = $health
      }
    }
    this.makeOrganisms($.now(),'woot')
  },

  loser : function() {
    var score = this.context.turn * 100;
    $.get({
      url : '/score',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
      }
    })
    .done((data)=>{
      if (data == "wrong wrong wrong") {
        $.post({
          url : '/score',
          data : {
            score : score
          },
          beforeSend: function( xhr ) {
            xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
          }
        })
      } else {
        if (data.score < score) {
          $.ajax({
            url : '/score',
            type : 'put',
            data : {
              score : score
            },
            beforeSend: function( xhr ) {
              xhr.setRequestHeader( "Authorization", 'Bearer ' + localStorage.token );
            }
          })
        }
      }
    })
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
        <div className="floatingStats"></div>
        <button id="babies" onClick={this.handleBaby} type="submit">Procreate</button>
      </div>
    )
  }
})

module.exports = Organisms;
