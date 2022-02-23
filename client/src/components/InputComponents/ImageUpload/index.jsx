import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = props => {
  const {
    name,
    classes: { uploadContainer, inputContainer, imgStyle }
  } = props;

  const [field, meta, { setValue }] = useField(props);

  const onChange = e => {
    const node = window.document.getElementById('imagePreview');

    const file = e.target.files[0];
    const imageType = /image\/jpeg|gif|png|jpg/;

    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
        console.log('node', node)
      };
      reader.readAsDataURL(file);
      setValue(file);
    }
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          value={undefined}
          id='fileInput'
          type='file'
          accept='.jpg, .gif, .png, .jpeg'
          onChange={onChange}
        />
        <label htmlFor='fileInput'>Chose file</label>
      </div>
      <img
        id='imagePreview'
        className={classNames({ [imgStyle]: !!field.value })}
        alt='user'
      />
    </div>
  );
};

export default ImageUpload;
