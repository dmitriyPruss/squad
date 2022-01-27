import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import PricesList from './PricesList';
import styles from './PricingPage.module.scss';

function PricingPage () {
  return (
    <>
      <Header />
      <section className={styles.pricingContainer}>
        <PricesList />
      </section>
      <Footer />
    </>
  );
}

export default PricingPage;
