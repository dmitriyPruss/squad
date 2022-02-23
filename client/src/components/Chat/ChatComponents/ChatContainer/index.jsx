import React from "react";
import { connect } from "react-redux";
import Chat from "../Chat";

const ChatContainer = (props) => {
  const { data } = props;
  return <>{data ? <Chat /> : null}</>;
};

const mapStateToProps = (state) => {
  const {
    userStore: { data },
  } = state;
  return { data };
};

export default connect(mapStateToProps, null)(ChatContainer);
