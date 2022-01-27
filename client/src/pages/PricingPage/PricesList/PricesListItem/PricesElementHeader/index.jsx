import React from 'react';
import ToggleButton from './ToggleButton';
import CurrencyValues from './CurrencyValues';

function PricesElementHeader (props) {
  const {
    priceHeaderClasses: { classHeader },
    styleColor,
    colorName,
    description,
  } = props;

  return (
    <div className={classHeader} style={styleColor}>
      <h3 style={styleColor}>{colorName}</h3>
      <ToggleButton {...props} />
      <p>{description}</p>
      <CurrencyValues {...props} />
    </div>
  );
}

export default PricesElementHeader;
