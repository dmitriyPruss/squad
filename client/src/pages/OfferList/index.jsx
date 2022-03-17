import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "./../../components/Footer";
import CreatorBox from "./CreatorBox";
import {
  setOfferStatus,
  getOffersForModeratorAction,
} from "../../actions/actionCreator";
import { ReactComponent as OfferImg } from "./offer.svg";
import CONSTANTS from "../../constants";
import styles from "./OfferList.module.scss";

const {
  STATUS: {
    OFFER: { PENDING },
  },
} = CONSTANTS;

function OfferList(props) {
  const { getOffersForModerator, checkOffers, isEndData } = props;

  const [page, setPage] = useState(1);

  const clickNextPage = () => {
    if (checkOffers.length) {
      setPage(page + 1);
    }
  };

  const clickPrevPage = () => {
    if (page !== 1 && page > 1) {
      setPage(page - 1);
    }
  };

  useLayoutEffect(() => {
    setPage(1);
  }, [isEndData]);

  useEffect(() => {
    getOffersForModerator(page);
  }, [page]);

  const setOfferList = (item, index) =>
    item.status === PENDING ? (
      <section key={index} className={styles.offerItem}>
        <CreatorBox
          page={page}
          getOffersForModerator={getOffersForModerator}
          data={item}
          key={item.id}
          setOfferStatus={setOfferStatus}
          date={new Date()}
        />
      </section>
    ) : (
      <section key={index} className={styles.offerItem}></section>
    );

  return (
    <>
      <Header />
      <article className={styles.offerList}>
        <OfferImg className={styles.header} />
        <div className={styles.moderatorImg}>
          <span>ONLY FOR </span>
          <img
            src="https://as1.ftcdn.net/v2/jpg/01/29/15/06/1000_F_129150651_ZXbFPssqK8wrfP3Zz7hwD1BWG6Xun4lC.jpg"
            alt="Offers"
          />
        </div>
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
          <Button onClick={clickPrevPage} as="button" variant="light">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            <span>Prev</span>
          </Button>
          <div className={styles.pageNumber}>
            <span>{page}</span>
          </div>
          <Button onClick={clickNextPage} as="button" variant="light">
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

export default connect(mapStateToProps, mapDispatchToProps)(OfferList);
