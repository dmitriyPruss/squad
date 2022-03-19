import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Spinner.module.sass";

const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <Spinner animation="grow" />
    <Spinner animation="grow" variant="dark" />
    <Spinner animation="grow" />
  </div>
);

export default SpinnerLoader;
