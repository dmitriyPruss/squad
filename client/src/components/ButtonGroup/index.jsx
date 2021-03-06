import React, { useState } from "react";
import ButtonItem from "./ButtonItem";
import Header from "./../Header";
import Footer from "./../Footer";
import CONSTANTS from "../../constants";
import styles from "./ButtonGroup.module.scss";

function ButtonGroup() {
  const { BUTTON_GROUP_DATA } = CONSTANTS;

  const [highlightedItems, setHighlightedItems] = useState(BUTTON_GROUP_DATA);

  const highlightElement = (id) => {
    const newHighlightedItems = highlightedItems.map((item, index) => {
      item.isHighlighted = index === id ? true : false;

      return item;
    });

    setHighlightedItems(newHighlightedItems);
  };

  return (
    <>
      <Header />
      <ul className={styles.buttonContainer}>
        {highlightedItems.map((i, index) => (
          <ButtonItem
            key={index}
            infoData={i}
            id={index}
            highlightElement={highlightElement}
          />
        ))}
      </ul>
      <Footer />
    </>
  );
}

export default ButtonGroup;
