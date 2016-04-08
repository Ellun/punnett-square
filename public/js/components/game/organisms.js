const $ = require('jquery');
require('jquery-ui')
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js');
const Weather = require('./weather.js');
const Habitat = require('./habitat.js');

const Organisms = React.createClass({

  componentDidMount : function() {
    if (this.state.organisms.length === 0) {
      for (var i = 0; i < 10; i++) {
        this.makeOrganisms($.now(),"new",'225px')
      }
    }
  },

  getInitialState : function() {
    return {
      organisms : [],
      iAmMom : '',
      iAmDad : ''
    }
  },

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
    router: React.PropTypes.object
  },

  makeOrganisms : function(i, mode, topPosition) {
    function rando(max,min) {
      return Math.floor(Math.random() * max) + min;
    }

    var gene = (mode,x,y) => {
      if (mode == "new") {
        var array = [];
        for (var i = 0; i < 2; i++) {
          var number = rando(3,1);
          switch (number) {
            case 1:
              var value = 'N';
              break;
            case 2:
              value = 'I';
              break;
            case 3:
              value = 'L';
              break;
            default:
              break;
          }
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
    if ($organism.attr('bodyType') == ['I','I']) {
      $organism.css('background-image', 'url(../../../images/icedude.png)')
    } else if ($organism.attr('bodyType') == ['L','L']) {
      $organism.css('background-image', 'url(../../../images/lavadude.png)')
    }
    $organism.attr('health',organism.health)
    $organism.css('top', topPosition)
    $organism.css('left', '90%')
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
      $('.floatingStats').text('Traits:' + $target.attributes[6].value + ' Health:' + $target.attributes[7].value);
      $('.floatingStats').css('border', '1px solid #0099FF')
    },
      () => {
        $('.floatingStats').empty();
        $('.floatingStats').css('border', 'none');
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

      $('#parent1').droppable({drop:()=>{
          this.setState({iAmMom:target.attributes[1].value})
          var dataText = [
            'Body Type :' + $('#' + this.state.iAmMom).attr('bodyType'),
            ' Health :' + $('#' + this.state.iAmMom).attr('health')
          ]
          this.context.showStats1(dataText)
          this.context.showPunnett1(data)
      }},{out:()=>{
        this.context.showStats1([])
        this.context.showPunnett1([])
        this.setState({iAmMom:''})
      }})
      $('#parent2').droppable({drop:()=>{
          this.setState({iAmDad:target.attributes[1].value})
          var dataText = [
            'Body Type :' + $('#' + this.state.iAmDad).attr('bodyType'),
            ' Health :' + $('#' + this.state.iAmDad).attr('health')
          ]
          this.context.showStats2(dataText)
          this.context.showPunnett2(data)
      }},{out:()=>{
        this.context.showStats2([])
        this.context.showPunnett2([])
        this.setState({iAmDad:''})
      }});
    })
  },

  dropOff : function() {
    var $stork = $('<div>');
    $stork.attr('id', 'stork');
    $('#habitat').append($stork);
    $stork.animate({'right': '90%'}, 5000)
    setTimeout(function() {
      $stork.remove()
    }, 5000)
  },

  handleBaby : function() {
    if ((this.context.punnett1.length == 0) || (this.context.punnett2.length == 0)) {
      var $error = $('<div>').attr('id', 'error');
      $error.click(()=>{
        $error.remove();
      })
      var div = $('<div>').addClass('error').append('<p>Uh Oh, looks like you forgot to select your parents!</p>');
      $error.append(div)
      $('#weather').append($error)
    } else {
      $('#error').remove();
      this.dropOff()
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
        if (((organismBody == ['L','L']) && (weather == coldWeather)) || //checks lavagolems
            ((organismBody == ['I','I']) && (weather == hotWeather))     //checks icegolems
        ){
          var weatherDMGs = 20
        } else if (((organismBody != ['I','I']) && (weather == coldWeather)) || //accounts for reg golems
                   ((organismBody != ['L','L']) && (weather == hotWeather))
          ){
          var weatherDMGs = 15
        } else {
          weatherDMGs = 0 //if they golem matches the environment, no additional damage is delt
        }

        // Damage cause by the habitat
        if (((organismBody == ['L','L']) && (habitat == coldHabitat)) || //checks lavagolems
            ((organismBody == ['I','I']) && (habitat == hotHabitat))     //checks icegolems
        ){
          var habitatDMGs = 30
        } else if (((organismBody != ["I","I"]) && (habitat == coldHabitat)) || //accounts for reg golems
                   ((organismBody != ['L','L']) && (habitat == hotHabitat))
          ){
          var habitatDMGs = 20
        } else {
          habitatDMGs = 0 //if they golem matches the environment, no additional damage is delt
        }

        var health = 70 + weatherDMGs + habitatDMGs;
        var $health = this.state.organisms[i][0].attributes[7].value - health
        if ($health <= 0) {
          if (this.state.organisms[i][0].attributes[1].value == this.state.iAmMom) {
            this.setState({iAmMom:''});
            this.state.organisms[i].remove()
            this.context.showStats1([]);
            this.context.showPunnett1([]);
          } else if (this.state.organisms[i][0].attributes[1].value == this.state.iAmDad) {
            this.setState({iAmDad:''})
            this.state.organisms[i].remove()
            this.context.showStats2([])
            this.context.showPunnett2([])
          }
          this.state.organisms[i].remove()
          this.state.organisms.splice(i,1)
          i --;
        } else {
          this.state.organisms[i][0].attributes[7].value = $health
          if ($('#' + this.state.iAmMom).attr('health') > 0) {
            var dataText = [
              'Body Type :' + $('#' + this.state.iAmMom).attr('bodyType'),
              ' Health :' + $('#' + this.state.iAmMom).attr('health')
            ]
            this.context.showStats1(dataText);
          }
          if ($('#' + this.state.iAmDad).attr('health') > 0) {
            var dataText = [
              'Body Type :' + $('#' + this.state.iAmDad).attr('bodyType'),
              ' Health :' + $('#' + this.state.iAmDad).attr('health')
            ]
            this.context.showStats2(dataText);
          }
        }
      }
      if (this.state.organisms.length <= 1) {
        this.loser();
      }
        this.makeOrganisms($.now(),'woot','7%')
    }
  },

  loser : function() {
    console.log('I am at loser');
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
    this.context.router.replace('/GameOver')
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
