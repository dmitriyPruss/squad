import React from "react";
import prices from "./prices.json";
import colors from "./colors.json";
import PricesListItem from "./PricesListItem";
import styles from "./PricesList.module.sass";

function PricesList() {
  return (
    <ul className={styles.articlesList}>
      {prices.map((p, i) => (
        <PricesListItem key={i} priceItem={p} color={colors[i]} />
      ))}
    </ul>
  );
}

export default PricesList;
