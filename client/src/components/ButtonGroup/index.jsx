import React, { useState } from 'react';
import ButtonItem from './ButtonItem';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import styles from './ButtonGroup.module.scss';

function ButtonGroup () {
  const data = [
    {
      header: 'Yes',
      main: 'The Domain should exactly match the name',
      isHighlighted: false
    },
    {
      header: 'Yes',
      main: 'But minor variants are allowed (Recommended)',
      isHighlighted: false
    },
    {
      header: 'No',
      main: 'I am only looking for a name, not a Domain',
      isHighlighted: false
    }
  ];

  const [highlightedItems, setHighlightedItems] = useState(data);

  const highlightElement = id => {
    const newHighlightedItems = highlightedItems.map((item, index) => {
      if (index === id) {
        item.isHighlighted = true;
      } else {
        item.isHighlighted = false;
      }

      return item;
    });

    setHighlightedItems(newHighlightedItems);
  };

  return (
    <>
      <Header></Header>
      <ul className={styles.buttonContainer}>
        {highlightedItems.map((i, index) => (
          <ButtonItem
            infoData={i}
            id={index}
            highlightElement={highlightElement}
          />
        ))}
      </ul>
      <Footer></Footer>
    </>
  );
}

export default ButtonGroup;
