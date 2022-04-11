import React from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDataForContest } from "../../actions/actionCreator";
import SpinnerLoader from "../SpinnerLoader";
import FormInput from "../FormInput";
import SelectInput from "../SelectInput";
import FieldFileInput from "../InputComponents/FieldFileInput";
import FormTextArea from "../InputComponents/FormTextArea";
import TryAgain from "../TryAgain";
import Schemes from "../../validators/validationSchemes";
import OptionalSelects from "../OptionalSelects";
import CONSTANTS from "../../constants";
import styles from "./ContestForm.module.sass";

const {
  CONTEST: { LOGO, NAME, TAGLINE },
} = CONSTANTS;

const variableOptions = {
  [NAME]: {
    styleName: "",
    typeOfName: "",
  },
  [LOGO]: {
    nameVenture: "",
    brandStyle: "",
  },
  [TAGLINE]: {
    nameVenture: "",
    typeOfTagline: "",
  },
};

class ContestForm extends React.Component {
  getPreference = () => {
    const { contestType, getData } = this.props;

    switch (contestType) {
      case NAME: {
        getData({
          characteristic1: "nameStyle",
          characteristic2: "typeOfName",
        });
        break;
      }
      case TAGLINE: {
        getData({ characteristic1: "typeOfTagline" });
        break;
      }
      case LOGO: {
        getData({ characteristic1: "brandStyle" });
        break;
      }
      default: {
        break;
      }
    }
  };

  componentDidMount() {
    this.getPreference();
  }

  render() {
    const {
      contestType,
      dataForContest: { isFetching, error, data },
      handleSubmit,
      formRef,
      isEditContest,
      initialValues: initVals,
    } = this.props;

    if (error) {
      return <TryAgain getData={this.getPreference} />;
    }
    if (isFetching) {
      return <SpinnerLoader />;
    }
    return (
      <>
        <div className={styles.formContainer}>
          <Formik
            initialValues={{
              title: "",
              industry: "",
              focusOfWork: "",
              targetCustomer: "",
              file: "",
              ...variableOptions[contestType],
              ...initVals,
            }}
            onSubmit={handleSubmit}
            validationSchema={Schemes.ContestSchema}
            innerRef={formRef}
            enableReinitialize
          >
            <Form>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>Title of contest</span>
                <FormInput
                  name="title"
                  type="text"
                  label="Title"
                  classes={{
                    container: styles.componentInputContainer,
                    input: styles.input,
                    warning: styles.warning,
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <SelectInput
                  name="industry"
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                    warning: styles.warning,
                  }}
                  header="Describe industry associated with your venture"
                  optionsArray={data.industry}
                />
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>
                  What does your company / business do?
                </span>
                <FormTextArea
                  name="focusOfWork"
                  type="text"
                  label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                  classes={{
                    container: styles.componentInputContainer,
                    inputStyle: styles.textArea,
                    warning: styles.warning,
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>
                  Tell us about your customers
                </span>
                <FormTextArea
                  name="targetCustomer"
                  type="text"
                  label="customers"
                  classes={{
                    container: styles.componentInputContainer,
                    inputStyle: styles.textArea,
                    warning: styles.warning,
                  }}
                />
              </div>
              <OptionalSelects {...this.props} />
              <FieldFileInput
                name="file"
                classes={{
                  fileUploadContainer: styles.fileUploadContainer,
                  labelClass: styles.label,
                  imageStyle: styles.imgStyle,
                  missingImage: styles.missingImage,
                  fileInput: styles.fileInput,
                  warning: styles.warning,
                }}
                type="file"
              />
              {isEditContest ? (
                <button type="submit" className={styles.changeData}>
                  Set Data
                </button>
              ) : null}
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    contestByIdStore: { isEditContest },
    contestStore,
    dataForContest,
  } = state;

  return {
    isEditContest,
    contestStore,
    dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getDataForContest(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestForm)
);
