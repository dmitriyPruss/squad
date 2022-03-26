import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Payment from "./pages/Payment";
import StartContestPage from "./pages/StartContestPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import ContestPage from "./pages/ContestPage";
import UserProfile from "./pages/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import ContestCreationPage from "./pages/ContestCreationPage";
import CONSTANTS from "./constants";
import browserHistory from "./browserHistory";
import ChatContainer from "./components/Chat/ChatComponents/ChatContainer";
import withAuth from "./components/HOCs/withAuth";
import PricingPage from "./pages/PricingPage";
import TransactionPage from "./pages/TransactionPage";
import ButtonGroup from "./components/ButtonGroup";
import HowItWorks from "./pages/HowItWorks";
import Events from "./pages/Events";
import OfferList from "./pages/OfferList";
import EmailPage from "./pages/EmailPage";

const {
  CONTEST: { NAME, LOGO, TAGLINE },
} = CONSTANTS;

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position="top-center"
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
          <Route exact path="/" component={Home} />
          <Route path="/howItWorks" component={HowItWorks} />
          <Route path="/buttonGroup" component={ButtonGroup} />
          <Route path="/eventsPage" component={Events} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
          <Route exact path="/payment" component={withAuth(Payment)} />
          <Route
            exact
            path="/startContest"
            component={withAuth(StartContestPage)}
          />
          <Route
            exact
            path="/startContest/nameContest"
            component={withAuth(ContestCreationPage, {
              contestType: NAME,
              title: "Company Name",
            })}
          />
          <Route
            exact
            path="/startContest/taglineContest"
            component={withAuth(ContestCreationPage, {
              contestType: TAGLINE,
              title: "TAGLINE",
            })}
          />
          <Route
            exact
            path="/startContest/logoContest"
            component={withAuth(ContestCreationPage, {
              contestType: LOGO,
              title: "LOGO",
            })}
          />
          <Route exact path="/dashboard" component={withAuth(Dashboard)} />
          <Route exact path="/contest/:id" component={withAuth(ContestPage)} />
          <Route exact path="/account" component={withAuth(UserProfile)} />

          <Route
            exact
            path="/transactions"
            component={withAuth(TransactionPage)}
          />
          <Route exact path="/offerList" component={withAuth(OfferList)} />
          <Route exact path="/emailPage" component={withAuth(EmailPage)} />
          <Route exact path="/pricing" component={PricingPage} />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

export default App;
