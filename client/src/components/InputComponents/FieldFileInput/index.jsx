import React from "react";
import { Field, useField } from "formik";

const FieldFileInput = (props) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } =
    props.classes;

  const [field, meta, { setValue }] = useField(props);

  const getFile = (e) => {
    // console.log("e.target.files :>> ", e.target.files);
    // console.log("e.target.value :>> ", e.target.value);

    const nameContainer = window.document.getElementById("fileNameContainer");

    const file = e.target.files[0];
    const imageType = /image\/jpeg|gif|png|jpg/;

    if (!file.type.match(imageType)) {
      e.target.value = "";
    } else {
      // nameContainer.textContent = file.name;
      const reader = new FileReader();

      reader.onload = () => {
        nameContainer.src = reader.result;
        console.log("node", nameContainer);
      };

      reader.readAsDataURL(file);
      setValue(file);
    }
  };

  // return (
  //   <Field name={rest.name}>
  //     {(props) => {
  //       const { field } = props;

  //       const getFileName = () => (field.value ? field.value.name : "???");

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>

      {/* {getFileName()} */}

      <input
        {...field}
        value={undefined}
        className={fileInput}
        id="fileInput"
        type="file"
        onChange={getFile}
      />
      <img id="fileNameContainer" alt="image" />
    </div>
  );
  //   }}
  // </Field>
  // );
};

export default FieldFileInput;
