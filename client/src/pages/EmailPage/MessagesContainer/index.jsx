import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import {
  getEmailMessageAction,
  directEmailBoxAction,
} from "../../../actions/actionCreator";
import Spinner from "react-bootstrap/Spinner";
import styles from "./../EmailPage.module.scss";
import CONSTANTS from "../../../constants";

function MessagesContainer(props) {
  const {
    getEmailMessages,
    directEmailBox,
    sendedEmailMessages,
    isEndMessages,
    isFetching,
  } = props;

  const [page, setPage] = useState(1);

  const clickNextPage = () => {
    setPage(page + 1);
  };

  const clickPrevPage = () => {
    if (page !== 1 && page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [isEndMessages]);

  useEffect(() => getEmailMessages(page), [page, getEmailMessages]);

  const getMessage = (item, index) => {
    return (
      <Message
        key={index}
        isFetching={isFetching}
        message={item}
        directEmailBox={directEmailBox}
      />
    );
  };

  return (
    <>
      <header>
        <h1>Email Post</h1>
        <img src={CONSTANTS.EMAIL_PAGE_LINK} alt="email" />
      </header>
      <main className={styles.emailContainer}>
        {isFetching && (
          <div className={styles.loaderContainer}>
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
        )}
        <ul className={styles.messageList}>
          {sendedEmailMessages.map(getMessage)}
        </ul>
        <section className={styles.pageButtons}>
          <Button onClick={clickPrevPage} as="button" variant="light">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            <span>Prev</span>
          </Button>
          <Button onClick={clickNextPage} as="button" variant="light">
            <span>Next</span>
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </Button>
        </section>
      </main>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    checkOfferStore: { sendedEmailMessages, isEndMessages, isFetching },
  } = state;
  return { sendedEmailMessages, isEndMessages, isFetching };
};

const mapDispatchToProps = (dispatch) => ({
  getEmailMessages: (page) => dispatch(getEmailMessageAction(page)),
  directEmailBox: (data) => dispatch(directEmailBoxAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
