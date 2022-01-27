import React from 'react';

function ToggleButton (props) {
  const {
    toggleElement,
    toggleSign,
    color,
    priceHeaderClasses: { toggledButton },
  } = props;

  return (
    <div className={toggledButton} style={color} onClick={toggleElement}>
      {toggleSign ? (
        <i class='far fa-plus-square'></i>
      ) : (
        <i class='far fa-minus-square'></i>
      )}
    </div>
  );
}

export default ToggleButton;
