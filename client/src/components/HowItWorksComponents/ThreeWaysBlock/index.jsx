import React from 'react';
import styles from './ThreeWaysBlock.module.scss';

import { ReactComponent as Users } from './svg_images/users.svg';
import { ReactComponent as Pc } from './svg_images/pc.svg';
import { ReactComponent as IdeaHand } from './svg_images/idea_hand.svg';

function ThreeWaysBlock () {
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
        <li className={styles.wayCardItem}>
          <Users style={{ width: '70px' }} />
          <h3>Launch a Contest</h3>
          <p>
            Work with hundreds of creative experts to get custom name
            suggestions for your business or brand. All names are auto-checked
            for URL availability.
          </p>
          <a
            href='https://www.squadhelp.com/start-contest'
            className={styles.wayButton}
          >
            Launch a Context
          </a>
        </li>
        <li className={styles.wayCardItem}>
          <Pc style={{ width: '70px' }} />
          <h3>Explore Names For Sale</h3>
          <p>
            Our branding team has curated thousands of pre-made names that you
            can purchase instantly. All names include a matching URL and a
            complimentary Logo Design
          </p>
          <a
            href='https://www.squadhelp.com/premium-domains-for-sale'
            className={styles.wayButton}
          >
            Explore Names For Sale
          </a>
        </li>
        <li className={styles.wayCardItem}>
          <IdeaHand style={{ width: '70px' }} />
          <h3>Agency-level Managed Contests</h3>
          <p>
            Our Managed contests combine the power of crowdsourcing with the
            rich experience of our branding consultants. Get a complete
            agency-level experience at a fraction of Agency costs
          </p>
          <a
            href='https://www.squadhelp.com/managed-contests'
            className={styles.wayButton}
          >
            Learn More
          </a>
        </li>
      </ul>
    </article>
  );
}

export default ThreeWaysBlock;
