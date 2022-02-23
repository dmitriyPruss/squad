import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
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
