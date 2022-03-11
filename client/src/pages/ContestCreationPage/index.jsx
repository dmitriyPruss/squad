import React, { useRef } from "react";
import { connect } from "react-redux";
import styles from "./ContestCreationPage.module.sass";
import {
  saveContestToStore,
  clearDataForContest,
} from "../../actions/actionCreator";
import NextButton from "../../components/NextButton";
import ContestForm from "../../components/ContestForm";
import BackButton from "../../components/BackButton";
import ProgressBar from "../../components/ProgressBar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ContestCreationPage = (props) => {
  const {
    bundleStore: { bundle },
    contestStore: { contests },
    contestType,
    history,
    saveContest,
    title,
  } = props;

  const formRef = useRef();
  const contestData = contests[contestType]
    ? contests[contestType]
    : { contestType };

  const handleSubmit = (values) => {
    console.log("values", values);

    saveContest({ type: contestType, info: values });
    const route =
      bundle[contestType] === "payment"
        ? "/payment"
        : `${bundle[contestType]}Contest`;
    history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !bundle && history.replace("/startContest");

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestStore, bundleStore } = state;
  return { contestStore, bundleStore };
};

const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
  clearDataForContest: () => dispatch(clearDataForContest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestCreationPage);
