const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'

const Punnett = React.createClass({

  contextTypes: {
    punnett1: React.PropTypes.array,
    punnett2: React.PropTypes.array
  },

  componentDidMount : function() {
    let intervalID = window.setInterval(() => {
      this.updateSquares();
    }, 500);
  },

  /* fills punnett squares with trait values */
  updateSquares : function() {
    let x = 8;
    let y = 9;
    let p1 = this.context.punnett1;
    let p2 = this.context.punnett2;
    if ((p1.length > 0) && (p2.length > 0)) {
      $('#tl').text(p1[x] + p2[x]);
      $('#bl').text(p1[x] + p2[y]);
      $('#tr').text(p1[y] + p2[x]);
      $('#br').text(p1[y] + p2[y]);

      $('.tl').text(p1[x]);
      $('.bl').text(p1[y]);
      $('.tr').text(p2[x]);
      $('.br').text(p2[y]);
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
