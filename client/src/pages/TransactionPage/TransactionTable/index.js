import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionTable.module.sass';

const TransactionTable = props => {
  const {
    transactions,
    fullName: { firstName, lastName },
  } = props;

  return (
    <>
      <h3 className={styles.header}>
        Hi, dear {firstName} {lastName}!
      </h3>
      <table className={styles.transTable}>
        <caption className={styles.transCaption}>
          {' '}
          Transaction Table ($ - USD)
        </caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Income/Expence</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, date, operationType, amount }) => (
            <tr key={id}>
              <td>{date}</td>
              <td>{operationType}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      operationType: PropTypes.string,
      amount: PropTypes.number,
    }).isRequired
  ),
};

export default TransactionTable;
