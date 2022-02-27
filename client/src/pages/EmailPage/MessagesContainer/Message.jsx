import React from "react";
import Alert from "react-bootstrap/Alert";
import styles from "./../EmailPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import CONSTANTS from './../../../constants';

function Message(props) {
  const {
    message: {
      moderator: { firstName, lastName, role },
      text,
      status,
      email
    },
    directEmailBox, isFetching
  } = props;

  const {
    STATUS: {
      OFFER: {
        PENDING, WON
      }
    }
  } = CONSTANTS;

  console.log('creatorEmail', email);

  return (
    <li className={styles.message}>
      <Alert variant={status === WON ? "success" : "dark"}>
        <p>{text}</p>
        <p>
          <span className={styles.messageSender}>
            From: {role[0].toUpperCase() + role.substr(1)}
          </span>
          <span>{` ${firstName} ${lastName}`}</span>
          <br />
          <span>Status: {status}</span>
          <hr />
          {email ? (
            <a style={{color: '#46568a'}} href={email} target="blank">
              <span>Follow </span>               
              <FontAwesomeIcon icon={faShareFromSquare} />
            </a>
          ) :
          (
            <a href='#' onClick={() => directEmailBox(props.message)}>
              <span>See more details... </span>
              <FontAwesomeIcon icon={faShareFromSquare} />
            </a>
          )}
        </p>
      </Alert>
    </li>
  );
}

export default Message;
