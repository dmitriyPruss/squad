import React from "react";
import { connect } from "react-redux";
import CONSTANTS from "../../constants";
import CustomerDashboard from "../../components/CustomerDashboard";
import CreatorDashboard from "../../components/CreatorDashboard";
import Header from "../../components/Header";

const Dashboard = (props) => {
  const { role, history, match } = props;

  return (
    <div>
      <Header />
      {role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard history={history} match={match} />
      ) : (
        <CreatorDashboard history={history} match={match} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
