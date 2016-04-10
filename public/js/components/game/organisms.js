const $     = require('jquery');
require('jquery-ui')
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

const Organisms = React.createClass({

  getInitialState : function() {
    return {
      organisms : [],
      iAmMom : '',
      iAmDad : ''
    }
  },

  /* makes golems on start of a game */
  componentDidMount : function() {
    for (var i = 0; i < 10; i++) {
      this.makeOrganisms($.now(),"new",'225px')
    }
  },

  contextTypes: {
    showStats1 : React.PropTypes.func,
    showStats2 : React.PropTypes.func,
    punnett1 : React.PropTypes.array,
    showPunnett1 : React.PropTypes.func,
    punnett2 : React.PropTypes.array,
    showPunnett2 : React.PropTypes.func,
    turn : React.PropTypes.number,
    showTurn : React.PropTypes.func,
    weather : React.PropTypes.bool,
    showWeather : React.PropTypes.func,
    habitat : React.PropTypes.bool,
    showHabitat : React.PropTypes.func,
    weatherImage : React.PropTypes.string,
    habitatImage : React.PropTypes.string,
    router : React.PropTypes.object
  },

  makeOrganisms : function(i, mode, topPosition) {
    /* generates random number */
    function rando(max,min) {
      return Math.floor(Math.random() * max) + min;
    }

    /*sets initial genes and passes parental genes */
    let gene = (mode,x,y) => {
      if (mode == "new") {
        let array = [];
        let value;
        for (let i = 0; i < 2; i++) { // grabs two genes
          let number = rando(3,1); // selects random gene
          switch (number) {
            case 1:
              value = 'N'; // stone golem gene
              break;
            case 2:
              value = 'I'; // ice golem gene
              break;
            case 3:
              value = 'L'; // lava golem gene
              break;
          }
          array.push(value);
        }
        return array;
      } else { // grabing traits from parents
        let value = rando(4,1);
        let p1 = this.context.punnett1;
        let p2 = this.context.punnett2;
        switch (value) {
          case 1:
            return [p1[x], p2[x]];
            break;
          case 2:
            return [p1[x], p2[y]];
            break;
          case 3:
            return [p1[y], p2[x]];
            break;
          case 4:
            return [p1[y], p2[y]];
            break;
        }
      }
    }

    /* constructor to make Organism */
    function Organism() {
      this.bodyType = gene(mode,0,1); // need to edit to just bodyType and health
      this.health = 100 ;
    }

    /* keeps organisms moving */
    function hustle($organism){
      let loop = 0;
      while (loop < 100) {
        $organism.animate({'left': rando(90, 1) + "%", 'top': rando(5,225) + "px"}, rando(8000,4000))
        loop ++
      }
    }

    let organism = new Organism(); // calls constructor to create organism
    let $organism = $('<div>'); // create a div
    let $floatingStats = $('<div>').addClass('floatingStats'); // stats will be displayed floating above
    $organism.addClass('organisms').attr({'id':'organisms' + i, 'bodyType':organism.bodyType, 'health':organism.health});
    if ($organism.attr('bodyType') == ['I','I']) {
      $organism.css('background-image', 'url(../../../images/icedude.png)')
    } else if ($organism.attr('bodyType') == ['L','L']) {
      $organism.css('background-image', 'url(../../../images/lavadude.png)')
    }
    $organism.css({'top':topPosition, 'left': '90%'}); // sets start point
    this.state.organisms.push($organism);
    $('#habitat').append($organism);
    $organism.draggable(); // makes organisms draggable
    hustle($organism); // animates organisms

    /* on hover */
    $organism.hover((event) => { // displays target attributes
      let $target = event.currentTarget;
      $('.floatingStats').text('Traits:' + $target.attributes[2].value + ' Health:' + $target.attributes[3].value);
      $('.floatingStats').css('border', '1px solid #0099FF');
    },
      () => { // off hover
        $('.floatingStats').empty();
        $('.floatingStats').css('border', 'none');
      }
    )

    $organism.mousedown((event) => {
      let target = event.currentTarget;
      let id = target.attributes[1].value
      $("#" + id ).stop(true); // stops animation
      $('#habitat').droppable({drop: function(){ //when dropped in habitat, run
        hustle($("#" + id ));
      }});

      let data = [ // saves attributes in array
        target.attributes[2].value[0],
        target.attributes[2].value[2]
      ]
      /* try to refactor into 1 function */
      $('#parent1').droppable({drop:()=>{ // shows stats on drop
          this.setState({iAmMom:id}) // saves id for reset later
          let dataText = [ // displays this in stats
            'Body Type :' + $('#' + this.state.iAmMom).attr('bodyType'),
            ' Health :' + $('#' + this.state.iAmMom).attr('health')
          ]
          this.context.showStats1(dataText)
          this.context.showPunnett1(data)
      }},{out:()=>{ // reset on out
        this.context.showStats1([])
        this.context.showPunnett1([])
        this.setState({iAmMom:''})
      }})
      $('#parent2').droppable({drop:()=>{
          this.setState({iAmDad:id})
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

  /* creates stork to drop off baby */
  dropOff : function() {
    let $stork = $('<div>');
    $stork.attr('id', 'stork');
    $('#habitat').append($stork);
    $stork.animate({'right': '110%'}, 5000)
    setTimeout(function() {
      $stork.remove()
    }, 5000)
  },

  handleBaby : function() {
    if ((this.context.punnett1.length == 0) || (this.context.punnett2.length == 0)) {
      let $error = $('<div>').attr('id', 'error');
      $error.click(()=>{
        $error.remove();
      })
      let div = $('<div>').addClass('error').append('<p>Uh Oh, looks like you forgot to select your parents!</p>');
      $error.append(div);
      $('#weather').append($error);
    } else {
      $('#error').remove();
      this.dropOff() // calls stork
      let organisms = this.state.organisms;
      this.context.showTurn(this.context.turn + 1);
      if (this.context.turn % 5 == 0) {
        this.context.showWeather(true);
        this.context.showHabitat(true);
      }
      for (let i = 0; i < organisms.length; i++) {
        let coldWeather = 'url(' + "../../../images/cold.png" + ')';
        let coldHabitat = 'url(' + "../../../images/iceworld.png" + ')';
        let hotWeather = 'url(' + "../../../images/sunny.png" + ')';
        let hotHabitat = 'url(' + "../../../images/landosand.png" + ')';
        let weather = this.context.weatherImage;
        let habitat = this.context.habitatImage;
        let organismBody = organisms[i][0].attributes[2].value;
        let weatherDMGs;
        let habitatDMGs;
        // Damage caused by the weather
        if (((organismBody == ['L','L']) && (weather == coldWeather)) || //checks lavagolems
            ((organismBody == ['I','I']) && (weather == hotWeather))     //checks icegolems
        ){
          weatherDMGs = 25
        } else if (((organismBody != ['I','I']) && (weather == coldWeather)) || //accounts for reg golems
                   ((organismBody != ['L','L']) && (weather == hotWeather))
          ){
          weatherDMGs = 15
        } else {
          weatherDMGs = 0 //if they golem matches the environment, no additional damage is delt
        }

        // Damage cause by the habitat
        if (((organismBody == ['L','L']) && (habitat == coldHabitat)) || //checks lavagolems
            ((organismBody == ['I','I']) && (habitat == hotHabitat))     //checks icegolems
        ){
          habitatDMGs = 30
        } else if (((organismBody != ["I","I"]) && (habitat == coldHabitat)) || //accounts for reg golems
                   ((organismBody != ['L','L']) && (habitat == hotHabitat))
          ){
          habitatDMGs = 25
        } else {
          habitatDMGs = 0 //if they golem matches the environment, no additional damage is delt
        }

        let health = 10 + weatherDMGs + habitatDMGs;
        let $health = organisms[i][0].attributes[3].value - health
        let mama = this.state.iAmMom;
        let pops = this.state.iAmDad;
        if ($health <= 0) {
          if (organisms[i][0].attributes[1].value == mama) {
            this.setState({iAmMom:''});
            organisms[i].remove()
            this.context.showStats1([]);
            this.context.showPunnett1([]);
          } else if (organisms[i][0].attributes[1].value == pops) {
            this.setState({iAmDad:''})
            organisms[i].remove()
            this.context.showStats2([])
            this.context.showPunnett2([])
          }
          organisms[i].remove()
          organisms.splice(i,1)
          i --;
        } else {
          organisms[i][0].attributes[3].value = $health
          if ($('#' + mama).attr('health') > 0) {
            var dataText = [
              'Body Type :' + $('#' + mama).attr('bodyType'),
              ' Health :' + $('#' + mama).attr('health')
            ]
            this.context.showStats1(dataText);
          }
          if ($('#' + pops).attr('health') > 0) {
            var dataText = [
              'Body Type :' + $('#' + pops).attr('bodyType'),
              ' Health :' + $('#' + pops).attr('health')
            ]
            this.context.showStats2(dataText);
          }
        }
      }
      if (organisms.length <= 1) {
        this.loser();
      } else {
        this.makeOrganisms($.now(),'woot','7%')
      }
    }
  },

  /* redirects to game over screen */
  loser : function() {
    let score = this.context.turn * 100;
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
    this.context.router.replace('/GameOver');
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
