import React from "react";
import threeWaysData from "./threeWaysData.json";
import { ReactComponent as Users } from "./svg_images/users.svg";
import { ReactComponent as Pc } from "./svg_images/pc.svg";
import { ReactComponent as IdeaHand } from "./svg_images/idea_hand.svg";
import styles from "./ThreeWaysBlock.module.scss";

function ThreeWaysBlock() {
  const svgComponents = [Users, Pc, IdeaHand];

  threeWaysData.forEach((i, index) => {
    i.svg = svgComponents[index];
  });

  const showWayComponents = (i, index) => (
    <li key={index} className={styles.wayCardItem}>
      <i.svg />
      <h3>{i.header}</h3>
      <p>{i.text}</p>
      <a href={i.link} className={styles.wayButton}>
        {i.linkText}
      </a>
    </li>
  );

  return (
    <article className={styles.threeWaysBlock}>
      <section className={styles.threeWaysHeaderBlock}>
        <span className={styles.likeButton}>Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </section>
      <ul className={styles.wayCards}>
        {threeWaysData.map(showWayComponents)}
      </ul>
    </article>
  );
}

export default ThreeWaysBlock;
