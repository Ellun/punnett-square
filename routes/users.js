const express     = require( 'express' );
const expressJWT  = require( 'express-jwt' );
const jwt         = require( 'jsonwebtoken' );
const users       = express.Router();
const bodyParser  = require( 'body-parser' );
const db          = require( '../db/pgp.js' );
const secret      = 'so secretive';


users.use( function( error, request, response, next ) {
 if( error.name === 'UnauthorizredError' ) {
   response.status( 401 ).json( { message: 'sorry, the information you entered did not match our records'} );
 }
});


users.post('/login', db.loginUser, ( req, res ) => {
  var token = jwt.sign( res.rows, secret );
  res.json( { agent: res.rows, token: token } );
});

// users.delete( '/delete', expressJWT( { secret:secret } ), db.deleteUser, ( req,res ) => {
//   res.send( 'deads' );
// });
//
//
// users.put( '/update', expressJWT( { secret:secret } ), db.updatePassword, ( req,res ) => {
//   res.send( 'go' )
// });

users.route('/')
  .get((req,res) => {res.json({data:'success'});})
  .post(db.createUser, db.loginUser,(req, res) => {
    var token = jwt.sign( res.rows, secret );
    res.json( { agent: res.rows, token: token } );
  });


module.exports = users;
