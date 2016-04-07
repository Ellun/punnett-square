const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')
const Organisms = require('./organisms.js')

const Punnett = React.createClass({

  contextTypes: {
    punnett1: React.PropTypes.array,
    showPunnett1: React.PropTypes.func,
    punnett2: React.PropTypes.array,
    showPunnett2: React.PropTypes.func
  },

  updateSquares : function() {
    console.log('hi');
    var x = 8;
    var y = 9;
      if ((this.context.punnett1.length > 0) && (this.context.punnett2.length > 0)) {
      $('#tl').text(this.context.punnett1[x] + this.context.punnett2[x]);
      $('#bl').text(this.context.punnett1[x] + this.context.punnett2[y]);
      $('#tr').text(this.context.punnett1[y] + this.context.punnett2[x]);
      $('#br').text(this.context.punnett1[y] + this.context.punnett2[y]);

      $('.tl').text(this.context.punnett1[x]);
      $('.bl').text(this.context.punnett1[y]);
      $('.tr').text(this.context.punnett2[x]);
      $('.br').text(this.context.punnett2[y]);
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(() => {
      this.updateSquares();
      // var value = event.target.value

      // switch (value) {
      //   case 1:
      //     x = 0;
      //     y = 1;
      //     break;
      //   case 2:
      //     x = 2;
      //     y = 3;
      //     break;
      //   case 3:
      //     x = 4;
      //     y = 5;
      //     break;
      //   case 4:
      //     x = 6;
      //     y = 7;
      //     break;
      //   case 5:
      //     x = 8;
      //     y = 9;
      //     break;
      //   default:
      //     break;
      // }
    }, 500);
  },


  render : function() {
    // <li value="1" className="punnett">Hair</li>
    // <li value="2"className="punnett">Fat</li>
    // <li value="3"className="punnett">Defense</li>
    // <li value="4"className="punnett">Water</li>
    return (
      <div id="punnett">

        <div id="tl"></div>
        <div className="tl"></div>

        <div id="bl"></div>
        <div className="bl"></div>

        <div id="tr"></div>
        <div className="tr"></div>

        <div id="br"></div>
        <div className="br"></div>

      </div>
    )
  }
})

module.exports = Punnett;
