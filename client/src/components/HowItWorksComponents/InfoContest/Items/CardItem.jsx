import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import ToggleElem from "./ToggleElem";
import styles from "./../InfoContest.module.scss";

function CardItem(props) {
  const { index, buttonText, children } = props;

  return (
    <Card>
      <Card.Header className={styles.toggleHeader}>
        <ToggleElem eventKey={index} index={index}>
          {buttonText}
        </ToggleElem>
      </Card.Header>
      <Accordion.Collapse eventKey={index}>
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default CardItem;
