'user strict'

const $               = require('jquery');
const React           = require('react');
const ReactDOM        = require('react-dom')
const ReactRouter     = require('react-router');
const Router          = ReactRouter.Router;
const Route           = ReactRouter.Route;
const Navigation      = ReactRouter.Navigation;
const Link            = ReactRouter.Link;
const browserHistory  = ReactRouter.browserHistory;
const IndexRoute      = ReactRouter.IndexRoute;

const Login           = require('./components/account/login.js');
const Signup          = require('./components/account/signup.js');
const Setting         = require('./components/account/setting.js');
const UpdatePassword  = require('./components/account/updatePassword.js');
const Home            = require('./components/home/home.js');
const Instructions    = require('./components/home/instructions.js');
const Scores          = require('./components/home/scores.js');
const Play            = require('./components/home/play.js');
const Gg              = require('./components/game/gg.js');

const App = React.createClass({
  getInitialState : function () {
    return {
      loggedIn : false
    }
  },

  /* adds fun animation to back ground */
  componentDidMount : function() {
    function rando(max,min) {
      return Math.floor(Math.random() * max) + min;
    }

    function hustle($buds) {
      $buds.animate({'left': rando(90, 5) + '%'}, rando(8000,4000))
      var intervalID = window.setInterval(() => {
        $buds.animate({'left': rando(90, 5) + '%'}, rando(8000,4000))
      }, 4000);
    }

    for (var i = 0; i < 15; i++) {
      var $buds = $('<div>');
      $buds.addClass('buds');
      $buds.attr('id', $.now())
      $('body').append($buds);
      hustle($buds);
    }
  },

  childContextTypes: {
    loggedIn: React.PropTypes.bool,
    setLoggedInTrue: React.PropTypes.func
  },

  getChildContext: function(){
    return {
     loggedIn: this.state.loggedIn,
     setLoggedInTrue: this.setLoggedInTrue
    }
  },

  setLoggedInTrue : function(value) {
    this.setState({loggedIn: value});
  },

  render : function() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

})

const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/settings" component={Setting} />
      <Route path="/updatePassword" component={UpdatePassword} />
      <Route path="/instructions" component={Instructions} />
      <Route path="/scores" component={Scores} />
      <Route path="/play" component={Play} />
      <Route path="/GameOver" component={Gg} />
    </Route>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#container'))

module.exports = App;
