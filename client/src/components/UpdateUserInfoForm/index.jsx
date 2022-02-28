import React from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { clearUserError } from "../../actions/actionCreator";
import styles from "./UpdateUserInfoForm.module.sass";
import ImageUpload from "../InputComponents/ImageUpload";
import FormInput from "../FormInput";
import Schemes from "../../validators/validationSchemes";
import Error from "../Error";

const UpdateUserInfoForm = (props) => {
  const { onSubmit, submitting, error, clearUserError, initialValues } = props;

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={Schemes.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && <Error data={error.data} status={error.status} clearError={clearUserError} />}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="LastName"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const {
    data: { firstName, lastName, displayName },
    error,
  } = state.userStore;
  return {
    error,
    initialValues: {
      firstName,
      lastName,
      displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);