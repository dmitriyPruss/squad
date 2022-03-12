import React from "react";
import { useField } from "formik";

const ImageUpload = (props) => {
  const {
    name,
    classes: { uploadContainer, inputContainer, imgStyle, missingImg },
  } = props;

  const [field, meta, { setValue }] = useField(props);

  const onChange = (e) => {
    const node = window.document.getElementById("imagePreview");

    const file = e.target.files[0];
    const imageType = /image\/jpeg|gif|png|jpg/;

    if (!file.type.match(imageType)) {
      e.target.value = "";
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
        console.log("node", node);
      };
      reader.readAsDataURL(file);
      setValue(file);
    }
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.jpg, *.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          value={""}
          id="fileInput"
          type="file"
          accept=".jpg, .gif, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      <img
        id="imagePreview"
        className={field.value ? imgStyle : missingImg}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
