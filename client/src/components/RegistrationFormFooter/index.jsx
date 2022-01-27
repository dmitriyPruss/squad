import React from 'react';
import footerData from './registrationFooterData.json';
import CONSTANTS from '../../constants';
import styles from './RegistrationFormFooter.module.scss';

function RegistrationFormFooter () {
  const showLastInfo = index => (
    <section key={index}>
      <h3 className={styles.headerArticle}>
        I have other questions! How can I get in touch with Squadhelp?
      </h3>
      <p className={styles.article}>
        Check out our{' '}
        <a href='http://help.squadhelp.com/' className={styles.orangeSpan}>
          FAQs
        </a>{' '}
        or send us a{' '}
        <a href='about:blank#blocked' className={styles.orangeSpan}>
          message
        </a>
        . For assistance with launching a contest, you can also call us at{' '}
        {CONSTANTS.CONTACTS.TEL} or schedule a{' '}
        <a
          href='https://www.squadhelp.com/signup'
          className={styles.orangeSpan}
        >
          Branding Consultation
        </a>
      </p>
    </section>
  );

  return (
    <section className={styles.articlesMainContainer}>
      {footerData.map((column, i) => (
        <section key={i} className={styles.ColumnContainer}>
          {column.map(({ header, body }, j) => {
            return i === 0 && j === 1 ? (
              <article key={j}>
                <h3 className={styles.headerArticle}>{header}</h3>
                {body.map(({ header, main }, i) => (
                  <article key={i}>
                    <span className={styles.articleEmphasized}>{header}</span>
                    <span className={styles.article}>{main}</span>
                  </article>
                ))}
              </article>
            ) : (
              <article key={j}>
                <h3 className={styles.headerArticle}>{header}</h3>
                <p className={styles.article}>{body}</p>
              </article>
            );
          })}
          {i === 1 && showLastInfo(i)}
        </section>
      ))}
    </section>
  );
}

export default RegistrationFormFooter;
