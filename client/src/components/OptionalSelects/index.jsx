import React from "react";
import CONSTANTS from "../../constants";
import SelectInput from "../SelectInput";
import FormInput from "../FormInput";
import styles from "../ContestForm/ContestForm.module.sass";
import SpinnerLoader from "../SpinnerLoader";

const OptionalSelects = (props) => {
  const {
    CONTEST: { LOGO, NAME, TAGLINE },
  } = CONSTANTS;

  const {
    isFetching,
    contestType,
    dataForContest: {
      data: { typeOfName, nameStyle, brandStyle, typeOfTagline },
    },
  } = props;

  if (isFetching) {
    return <SpinnerLoader />;
  }
  switch (contestType) {
    case NAME: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="type of company"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={nameStyle}
          />
        </>
      );
    }
    case LOGO: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="brandStyle"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Brand Style"
            optionsArray={brandStyle}
          />
        </>
      );
    }
    case TAGLINE: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Type tagline"
            optionsArray={typeOfTagline}
          />
        </>
      );
    }
  }
};

export default OptionalSelects;
