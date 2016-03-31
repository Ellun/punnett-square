'use strict'

require( 'dotenv' ).config();
const express      = require( 'express' );
const logger       = require( 'morgan' );
const path         = require( 'path' );
const db           = require( './db/pgp.js' );
const bodyParser   = require( 'body-parser' );
const expressJwt   = require( 'express-jwt' );
const jsonwebtoken = require( 'jsonwebtoken' );
const bcrypt       = require( 'bcrypt' );

const app = express();
// const userRoutes = require( path.join( __dirname, '/routes/users' ) );
// const searchRoutes = require( path.join( __dirname, '/routes/search' ) );

app.use( logger( 'dev' ) );
app.use( express.static( path.join( __dirname, 'public') ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

// app.use( '/users', userRoutes );
// app.use( '/search', searchRoutes );

app.get( '/*', ( req,res ) => {
  res.sendFile( path.join( __dirname,'index.html') )
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Ayyyeeeeeee Sexyyy Lady! ', port);
});
