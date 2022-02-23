import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import CONSTANTS from "../../constants";
import { setOffer, clearAddOfferError } from "../../actions/actionCreator";
import styles from "./OfferForm.module.sass";
import ImageUpload from "../InputComponents/ImageUpload";
import FormInput from "../FormInput";
import Schemes from "../../validators/validationSchemes";
import Error from "../Error";

const OfferForm = (props) => {
  const {
    CONTEST: { LOGO },
  } = CONSTANTS;

  const { contestId, contestType, customerId, valid, addOfferError, clearOfferError, setNewOffer } =
    props;

  console.log("props valid", props.valid);

  const renderOfferInput = () => {
    if (contestType === LOGO) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    clearOfferError();
    const data = new FormData();

    data.append("contestId", contestId);
    data.append("contestType", contestType);
    data.append("offerData", values.offerData);
    data.append("customerId", customerId);

    setNewOffer(data);

    resetForm();
  };

  const validationSchema = contestType === LOGO ? Schemes.LogoOfferSchema : Schemes.TextOfferSchema;

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: "",
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          }
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    contestByIdStore: { addOfferError },
  } = state;

  return { addOfferError };
};

const mapDispatchToProps = (dispatch) => ({
  setNewOffer: (data) => dispatch(setOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
