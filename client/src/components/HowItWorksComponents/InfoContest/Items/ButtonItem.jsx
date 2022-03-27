import React from "react";
import classNames from "classnames";
import styles from "./../InfoContest.module.scss";

function ButtonItem(props) {
  const { children, view, changeView, decoratedClick } = props;

  const arrowClass = classNames(
    "fas fa-arrow-right",
    view ? `${styles.arrowDown}` : `${styles.arrowRight}`
  );

  return (
    <button
      className={styles.launchingButton}
      onClick={() => {
        changeView();
        decoratedClick();
      }}
    >
      <span>{children}</span>
      <span>
        <i className={arrowClass}></i>
      </span>
    </button>
  );
}

export default ButtonItem;
