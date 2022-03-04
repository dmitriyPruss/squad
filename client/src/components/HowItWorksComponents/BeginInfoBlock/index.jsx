import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ReactComponent as MobileUser } from "./mobileUser.svg";
import CONSTANTS from "../../../constants";
import styles from "./BeginInfoBlock.module.scss";

function BeginInfoBlock() {
  const {
    HOW_IT_WORKS: { PLAY_VIDEO },
  } = CONSTANTS;

  return (
    <article className={styles.beginInfoBlock}>
      <section>
        <span className={styles.likeButton}>World's #1 Naming Platform</span>
        <h1 className={styles.mainHeader}>How Does Squadhelp Work?</h1>
        <p>
          Squadhelp helps you come up with a great name for your business by
          combining the power of crowdsourcing with sophisticated technology and
          Agency-level validation services.
        </p>
        <button className={styles.playVideoButton}>
          {" "}
          <PlayArrowIcon />{" "}
          <a target="_blank" rel="noreferrer" href={PLAY_VIDEO.link}>
            {PLAY_VIDEO.text}
          </a>
        </button>
      </section>
      <MobileUser />
    </article>
  );
}

export default BeginInfoBlock;
