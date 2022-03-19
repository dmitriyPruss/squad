import React from "react";
import styles from "./ButtonGroup.module.scss";

function ButtonItem(props) {
  const {
    id,
    infoData: { header, main, isHighlighted },
    highlightElement,
  } = props;

  return (
    <li
      className={isHighlighted ? styles.highlightElement : styles.buttonItem}
      onClick={(e) => highlightElement(id)}
    >
      <h3>{header}</h3>
      <p>{main}</p>
    </li>
  );
}

export default ButtonItem;
