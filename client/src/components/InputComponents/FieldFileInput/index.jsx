import React from "react";
import { Field, useField } from "formik";

const FieldFileInput = (props) => {
  const {
    fileUploadContainer,
    labelClass,
    imageStyle,
    missingImage,
    fileInput,
  } = props.classes;

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

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>

      <input
        {...field}
        value={""}
        className={fileInput}
        id="fileInput"
        type="file"
        onChange={getFile}
      />
      <img
        id="fileNameContainer"
        className={field.value !== "" ? imageStyle : missingImage}
        alt="image"
      />
    </div>
  );
};

export default FieldFileInput;
