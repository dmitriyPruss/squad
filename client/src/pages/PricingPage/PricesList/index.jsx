import React from 'react';
import prices from './prices.json';
import PricesListItem from './PricesListItem';
import styles from './PricesList.module.sass';

const colorMap = [
  'rgb(224,180,141)',
  'rgb(233,191,100)',
  'rgb(101,101,101)',
  'rgb(61,213,212)',
];

function PricesList () {
  return (
    <ul className={styles.articlesList}>
      {prices.map((p, i) => (
        <PricesListItem key={i} priceItem={p} color={colorMap[i]} />
      ))}
    </ul>
  );
}

export default PricesList;
