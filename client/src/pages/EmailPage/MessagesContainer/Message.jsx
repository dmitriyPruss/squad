import React from "react";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareFromSquare,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import CONSTANTS from "./../../../constants";
import styles from "./../EmailPage.module.scss";

function Message(props) {
  const {
    message: {
      moderator: { firstName, lastName, role },
      text,
      status,
      email,
      fileName,
    },
    directEmailBox,
  } = props;

  const {
    STATUS: {
      OFFER: { WON },
    },
    PUBLIC_URL,
  } = CONSTANTS;

  return (
    <li className={styles.message}>
      <Alert variant={status === WON ? "success" : "dark"}>
        <p>{text}</p>
        <img
          className={fileName ? styles.imgStyle : styles.missingImg}
          src={`${PUBLIC_URL}${fileName}`}
          alt="logo"
        />
        <div>
          <span className={styles.messageSender}>
            From: {role[0].toUpperCase() + role.substr(1)}
          </span>
          <span>{` ${firstName} ${lastName}`}</span>
          <br />
          <span>Status: {status}</span>
          <hr />
          {email ? (
            <a
              style={{ color: "red" }}
              className={styles.emailInfoLink}
              href={email}
              target="blank"
            >
              <span>Follow </span>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          ) : (
            <button onClick={() => directEmailBox(props.message)}>
              <span>See more details... </span>
              <FontAwesomeIcon icon={faShareFromSquare} />
            </button>
          )}
        </div>
      </Alert>
    </li>
  );
}

export default Message;
