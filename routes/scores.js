const express     = require( 'express' );
const jwt         = require( 'jsonwebtoken' );
const scores       = express.Router();
const bodyParser  = require( 'body-parser' );
const db          = require( '../db/pgp.js' );


scores.route('/highscores')
  .get(db.allScores, (req,res)=>{
    res.json(res.rows)
  })

scores.route('/')
  .get(db.checkScore, (req,res)=>{
    res.send(res.rows)
  })
  .post(db.createScore, (req,res)=>{
    res.send( 'go' )
  })
  .put(db.updateScore, (req,res)=>{
    res.send( 'go' )
  })

module.exports = scores;
