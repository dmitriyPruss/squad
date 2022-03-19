import React from "react";

function ToggleButton(props) {
  const {
    toggleElement,
    toggleSign,
    color,
    priceHeaderClasses: { toggledButton },
  } = props;

  return (
    <div className={toggledButton} style={color} onClick={toggleElement}>
      {toggleSign ? (
        <i className="far fa-plus-square"></i>
      ) : (
        <i className="far fa-minus-square"></i>
      )}
    </div>
  );
}

export default ToggleButton;
