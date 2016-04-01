const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const Play = require('../play.js')
const Organisms = require('./organisms.js')

const Habitat = React.createClass({

  updateHabitat : function() {
    var value = Math.floor(Math.random() * 4) + 1 ;
    switch (value) {
      case 1:
        this.state.color = "green";
        this.state.habitat = "field"
        break;
      case 2:
        this.state.color = "red";
        this.state.habitat = "dry";
        break;
      case 3:
        this.state.color = "#00CCFF";
        this.state.habitat = "ice"
        break;
      case 4:
        this.state.color = "blue";
        this.state.habitat = "water"
        break;
      default:
    }
    this.setState({color:this.state.color, habitat:this.state.habitat})
  },

  getInitialState : function() {
    return {
      color : "green",
      habitat : "field"
    }
  },

  componentDidMount : function() {
    var intervalID = window.setInterval(this.updateHabitat, 2000);
  },


  render : function() {
    var style = {
      backgroundColor: this.state.color
    }
    return (
      <div style={style} id="habitat">
        <Organisms/>
      </div>
    )
  }
})

module.exports = Habitat;
