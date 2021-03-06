import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { payRequest, clearPaymentStore } from "../../actions/actionCreator";
import PayForm from "../../components/PayForm";
import styles from "./Payment.module.sass";
import CONSTANTS from "../../constants";
import Error from "../../components/Error";

const Payment = (props) => {
  const {
    contestStore: { contests },
    clearPaymentStore,
    history,
    pay: toPay,
    payment: { error },
  } = props;

  const pay = (values) => {
    const contestArray = [];

    Object.keys(contests).forEach((key) => contestArray.push(contests[key]));
    const { number, expiry, cvc } = values;
    const data = new FormData();

    contestArray.forEach((contest) => {
      data.append("files", contest.file);
      contest.haveFile = !!contest.file;
    });

    data.append("number", number);
    data.append("expiry", expiry);
    data.append("cvc", cvc);
    data.append("contests", JSON.stringify(contestArray));
    data.append("price", "100");

    toPay({
      data: {
        formData: data,
      },
      history,
    });
  };

  const goBack = () => {
    history.goBack();
  };

  if (isEmpty(contests)) {
    history.replace("startContest");
  }

  return (
    <div>
      <div className={styles.header}>
        <Link to="/">
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            alt="blue-logo"
          />
        </Link>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearPaymentStore}
            />
          )}
          <PayForm sendRequest={pay} back={goBack} isPayForOrder />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>$100 USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>$100.00 USD</span>
          </div>
          <a href="http://www.google.com">Have a promo code?</a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ payment, contestStore }) => ({
  payment,
  contestStore,
});

const mapDispatchToProps = (dispatch) => ({
  pay: ({ data, history }) => dispatch(payRequest(data, history)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
