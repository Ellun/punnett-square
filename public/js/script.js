'user strict'

const $               = require( 'jquery' );
const React           = require('react');
const ReactDOM        = require('react-dom')
const ReactRouter     = require( 'react-router' );
const Router          = ReactRouter.Router;
const Route           = ReactRouter.Route;
const Navigation      = ReactRouter.Navigation;
const Link            = ReactRouter.Link;
const browserHistory  = ReactRouter.browserHistory;

const Login           = require( './components/login/login.js' )

const App = React.createClass({
  render : function() {
    return (
      <div id="home">
        <Login />
      </div>
    )
  }
})

const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
    </Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#container'))
