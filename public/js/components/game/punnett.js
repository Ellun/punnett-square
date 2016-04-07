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
    } else {
      $('#tl').empty()
      $('#bl').empty()
      $('#tr').empty()
      $('#br').empty()

      $('.tl').empty()
      $('.bl').empty()
      $('.tr').empty()
      $('.br').empty()
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(() => {
      this.updateSquares();
    }, 500);
  },


  render : function() {
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
