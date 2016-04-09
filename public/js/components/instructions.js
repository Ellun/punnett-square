const $ = require('jquery');
const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const App = require('../script.js')
const Setting = require('./setting.js')
const Home = require('./home.js')

const Instructions = React.createClass({
  render : function() {
    return (
      <div id="instructions">
        <h1 className="header">Instructions</h1>
        <p> Golems are being bombarded with extreme weather and habitats.
        Help these poor critters selectively breed to survive these harsh terrains!
        </p>
        <p>
        Drag and drop the parents in the drop slots.
        <img src="../../images/dropstonedude.png"/>
        </p>
        <p>
        Use the punnett square to determine what your children will look like.
        </p>
        <p>
        Golems come in Stone, Ice, or Lava form. What determines this is their genetic makeup.
        Lava golems have a genetic makeup of (LL).
        Ice golems have a genetic makeup of (II).
        Stone golems is anything else!
        </p>


        <Link id="scoresHome" to="/home">Menu</Link>
      </div>
    )
  }
})

module.exports = Instructions;
