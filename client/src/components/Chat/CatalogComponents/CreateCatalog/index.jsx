import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import FormInput from "../../../FormInput";
import { createCatalog } from "../../../../actions/actionCreator";
import Schemes from "../../../../validators/validationSchemes";
import styles from "./CreateCatalog.module.sass";

const CreateCatalog = (props) => {
  const click = (values) => {
    const { addChatId, createCatalog } = props;
    createCatalog({ catalogName: values.catalogName, chatId: addChatId });
  };
  return (
    <Formik
      onSubmit={click}
      initialValues={{ catalogName: "" }}
      validationSchema={Schemes.CatalogSchema}
    >
      <Form className={styles.form}>
        <FormInput
          name="catalogName"
          type="text"
          label="name of catalog"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.fieldWarning,
            notValid: styles.notValid,
          }}
        />
        <button type="submit">Create Catalog</button>
      </Form>
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createCatalog: (data) => dispatch(createCatalog(data)),
});

const mapStateToProps = (state) => state.chatStore;

export default connect(mapStateToProps, mapDispatchToProps)(CreateCatalog);
