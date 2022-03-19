import React from "react";
import { connect } from "react-redux";
import { onlyForNotAuthorize } from "../../actions/actionCreator";
import SpinnerLoader from "../SpinnerLoader";

const withNotAuth = (Component) => {
  class HocForLoginSignUp extends React.Component {
    componentDidMount() {
      const { checkAuth, history } = this.props;

      checkAuth(history.replace);
    }

    render() {
      const { isFetching, data, history } = this.props;

      if (isFetching) {
        return <SpinnerLoader />;
      }
      if (!data) {
        return <Component history={history} />;
      }
      return null;
    }
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (data) => dispatch(onlyForNotAuthorize(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default withNotAuth;
