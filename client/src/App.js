import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import { withAuth, withNotAuth } from './components/HOCs';
import PricingPage from './pages/PricingPage';
import TransactionPage from './pages/TransactionPage';
import HowItWorks from './components/HowItWorks';
import ButtonGroup from './components/ButtonGroup';
import Events from './pages/Events';

const {
  CONTEST: { NAME, LOGO, TAGLINE }
} = CONSTANTS;

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/howItWorks' component={HowItWorks} />
          <Route path='/buttonGroup' component={ButtonGroup} />
          <Route path='/eventsPage' component={Events} />
          <Route exact path='/login' component={withNotAuth(LoginPage)} />
          <Route
            exact
            path='/registration'
            component={withNotAuth(RegistrationPage)}
          />
          <Route exact path='/payment' component={withAuth(Payment)} />
          <Route
            exact
            path='/startContest'
            component={withAuth(StartContestPage)}
          />
          <Route
            exact
            path='/startContest/nameContest'
            component={withAuth(ContestCreationPage, {
              contestType: NAME,
              title: 'Company Name'
            })}
          />
          <Route
            exact
            path='/startContest/taglineContest'
            component={withAuth(ContestCreationPage, {
              contestType: TAGLINE,
              title: 'TAGLINE'
            })}
          />
          <Route
            exact
            path='/startContest/logoContest'
            component={withAuth(ContestCreationPage, {
              contestType: LOGO,
              title: 'LOGO'
            })}
          />
          <Route exact path='/dashboard' component={withAuth(Dashboard)} />
          <Route exact path='/contest/:id' component={withAuth(ContestPage)} />
          <Route exact path='/account' component={withAuth(UserProfile)} />

          <Route
            exact
            path='/transactions'
            component={withAuth(TransactionPage)}
          />
          <Route exact path='/pricing' component={PricingPage} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

export default App;
