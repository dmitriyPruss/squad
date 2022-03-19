import React from "react";
import { useField } from "formik";

const FieldFileInput = (props) => {
  const {
    fileUploadContainer,
    labelClass,
    imageStyle,
    missingImage,
    fileInput,
  } = props.classes;

  const [field, meta, { setValue }] = useField(props);

  const nameContainer = window.document.getElementById("fileNameContainer");

  const getFile = (e) => {
    const file = e.target.files[0];
    const imageType = /image\/jpeg|gif|png|jpg/;

    if (!file.type.match(imageType)) {
      e.target.value = "";
    } else {
      const reader = new FileReader();

      reader.onload = () => {
        nameContainer.src = reader.result;
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
        className={field.value.type ? imageStyle : missingImage}
        alt="image"
      />
    </div>
  );
};

export default FieldFileInput;
