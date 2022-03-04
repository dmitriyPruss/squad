import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "./../../components/Footer";
import CreatorBox from "./CreatorBox";
import {
  setOfferStatus,
  getOffersForModeratorAction,
} from "../../actions/actionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import CONSTANTS from "../../constants";
import styles from "./OfferList.module.scss";

const {
  STATUS: {
    OFFER: { PENDING },
  },
} = CONSTANTS;

function OfferList(props) {
  const { getOffersForModerator, checkOffers, isEndData } = props;

  console.log("OfferList checkOffers", checkOffers);
  console.log("OfferList isEndData", isEndData);

  const [page, setPage] = useState(1);

  const clickNextPage = () => {
    if (checkOffers.length) {
      setPage(page + 1);
    }

    console.log("page", page);
  };

  const clickPrevPage = () => {
    if (page !== 1 && page > 1) {
      setPage(page - 1);
      console.log("page", page);
    }
  };

  useLayoutEffect(() => {
    setPage(1);
  }, [isEndData]);

  useEffect(() => {
    getOffersForModerator(page);
  }, [page]);

  const setOfferList = (item, index) => {
    const needButtons = (offerStatus) => {
      return true;
    };

    console.log("item.status for CreatorBox", item.status);

    return item.status === PENDING ? (
      <section key={index} className={styles.offerItem}>
        <CreatorBox
          page={page}
          getOffersForModerator={getOffersForModerator}
          data={item}
          key={item.id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatus}
          date={new Date()}
        />
      </section>
    ) : (
      <section key={index} className={styles.offerItem}></section>
    );
  };

  return (
    <>
      <Header />
      <article className={styles.offerList}>
        <h1>OFFERS</h1>
        <section className={styles.offerContainer}>
          {checkOffers.length !== 0 ? (
            checkOffers.map(setOfferList)
          ) : (
            <div className={styles.offerInfo}>
              There are no offers at this moment...
            </div>
          )}
        </section>
        <section className={styles.pageButtons}>
          <Button onClick={clickPrevPage} as="button" variant="outline-primary">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            <span>Prev</span>
          </Button>
          <div className={styles.pageNumber}>
            <span>{page}</span>
          </div>
          <Button onClick={clickNextPage} as="button" variant="outline-primary">
            <span>Next</span>
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </Button>
        </section>
      </article>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    checkOfferStore: { checkOffers, isEndData },
  } = state;
  return { checkOffers, isEndData };
};

const mapDispatchToProps = (dispatch) => ({
  getOffersForModerator: (page) => dispatch(getOffersForModeratorAction(page)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferList)
);
