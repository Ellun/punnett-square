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

  handleClick : function(event) {
    event.preventDefault()
    var value = event.target.value
    var x = '';
    var y = '';
    switch (value) {
      case 1:
        x = 0;
        y = 1;
        break;
      case 2:
        x = 2;
        y = 3;
        break;
      case 3:
        x = 4;
        y = 5;
        break;
      case 4:
        x = 6;
        y = 7;
        break;
      case 5:
        x = 8;
        y = 9;
        break;
      default:
        break;
    }
    $('#tl').text(this.context.punnett1[x] + this.context.punnett2[x]);
    $('#bl').text(this.context.punnett1[x] + this.context.punnett2[y]);
    $('#tr').text(this.context.punnett1[y] + this.context.punnett2[x]);
    $('#br').text(this.context.punnett1[y] + this.context.punnett2[y]);
  },


  render : function() {
    // <li value="1" className="punnett">Hair</li>
    // <li value="2"className="punnett">Fat</li>
    // <li value="3"className="punnett">Defense</li>
    // <li value="4"className="punnett">Water</li>
    return (
      <div id="punnett">
        <ul onClick={this.handleClick}>
          <li value="5"className="punnett">Body</li>
        </ul>

        <div id="tl">
        </div>

        <div id="bl">
        </div>

        <div id="tr">
        </div>

        <div id="br">
        </div>

      </div>
    )
  }
})

module.exports = Punnett;
