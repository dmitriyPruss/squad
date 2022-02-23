import React from "react";
import { connect } from "react-redux";
import { getUserAction } from "../../actions/actionCreator";
import SpinnerLoader from "../SpinnerLoader";

const withAuth = (Component, props) => {
  class Hoc extends React.Component {
    componentDidMount() {
      const { data, getUser } = this.props;

      if (!data) {
        getUser();
      }
    }

    render() {
      const { isFetching, history, match } = this.props;
      return (
        <>
          {isFetching ? (
            <SpinnerLoader />
          ) : (
            <Component history={history} match={match} {...props} />
          )}
        </>
      );
    }
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUserAction(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default withAuth;
