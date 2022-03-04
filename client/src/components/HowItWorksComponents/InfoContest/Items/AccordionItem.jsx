import React from "react";
import Accordion from "react-bootstrap/Accordion";
import CardItem from "./CardItem";
import styles from "./../InfoContest.module.scss";

const AccordionItem = (props) => (
  <li className={styles.launchingListItem}>
    {props.index === 0 ? (
      <Accordion defaultActiveKey={props.index}>
        <CardItem {...props} />
      </Accordion>
    ) : (
      <Accordion>
        <CardItem {...props} />
      </Accordion>
    )}
  </li>
);

export default AccordionItem;
