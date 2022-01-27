import React from 'react';

function CurrencyValue (props) {
  const { value, leftVal, translateVal, fontSizeVal } = props;

  return (
    <span
      style={{
        position: 'absolute',
        left: `${leftVal}px`,
        transform: `translateY(${translateVal}px)`,
        fontSize: `${fontSizeVal}`,
      }}
    >
      {value}
    </span>
  );
}

export default CurrencyValue;
