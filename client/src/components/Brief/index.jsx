import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateContest,
  changeEditContest,
  clearUpdateContestStore,
} from "../../actions/actionCreator";
import ContestForm from "../ContestForm";
import styles from "./Brief.module.sass";
import ContestInfo from "../Contest/ContestInfo";
import Error from "../Error";

const Brief = (props) => {
  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "file" && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append("file", values.file);
    }
    data.append("contestId", props.contestData.id);
    props.update(data);
  };

  const getContestObjInfo = () => {
    // ОТрефакторить - перекопировать по нормальному свойства из обного обьекта в другой!
    const {
      contestData: {
        focusOfWork,
        industry,
        nameVenture,
        styleName,
        targetCustomer,
        title,
        brandStyle,
        typeOfName,
        typeOfTagline,
        originalFileName,
        contestType,
      },
    } = props;

    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };

    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === "originalFileName") {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });
    return defaultData;
  };

  const {
    isEditContest,
    contestData,
    changeEditContest,
    role,
    goChat,
    clearUpdateContestStore,
    updateContestStore: { error },
    userStore: {
      data: { id },
    },
  } = props;

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={id}
        contestData={contestData}
        changeEditContest={changeEditContest}
        role={role}
        goChat={goChat}
      />
    );
  }
  return (
    <div className={styles.contestForm}>
      {error && (
        <Error data={error.data} status={error.status} clearError={clearUpdateContestStore} />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    contestByIdStore: { isEditContest },
    updateContestStore,
    userStore,
  } = state;
  return { updateContestStore, userStore, isEditContest };
};

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(updateContest(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  clearUpdateContestStore: () => dispatch(clearUpdateContestStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Brief));
