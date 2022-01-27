import React, { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import styles from './TransactionPage.module.sass';
import { getTransactionAction } from './../../actions/actionCreator';
import TransactionTable from './TransactionTable';

function TransactionPage (props) {
  const {
    firstName,
    lastName,
    transactions,
    error,
    isFetching,
    getTransactions,
  } = props;

  useEffect(() => {
    getTransactions();
  }, [transactions.length]);

  return (
    <main className={styles.transPageContainer}>
      <Header />
      {isFetching && (
        <div
          style={{
            fontSize: '22px',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          Loading...
        </div>
      )}
      {error && (
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '',
          }}
        >
          Something went wrong. Visit our site later...
        </div>
      )}
      <section className={styles.transactionTableContainer}>
        <TransactionTable
          transactions={transactions}
          fullName={{ firstName, lastName }}
        />
      </section>
      <Footer />
    </main>
  );
}

const mapStateToProps = state => {
  const {
    userStore: {
      data: { firstName, lastName },
    },
    transactions: { transactions: transactions, error, isFetching },
  } = state;

  return { firstName, lastName, transactions, error, isFetching };
};

const mapDispatchToProps = dispatch => ({
  getTransactions: () => dispatch(getTransactionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
