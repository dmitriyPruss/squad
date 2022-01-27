import React from 'react';
import CurrencyValue from './CurrencyValue';

function CurrencyValues (props) {
  const {
    styleColor,
    currency,
    amount,
    priceHeaderClasses: { currencyClass, currencyValuesClass },
  } = props;

  return (
    <div className={currencyValuesClass} style={styleColor}>
      <span>{currency}</span>
      <span className={currencyClass}>
        {amount.split('').map((value, index) => {
          if (index === 0) {
            return +value === 4 || +value === 9 ? (
              <CurrencyValue
                value={value}
                leftVal={index + 1}
                translateVal={2}
                fontSizeVal={'22px'}
              />
            ) : (
              <CurrencyValue
                value={value}
                leftVal={index + 1}
                translateVal={3 + index}
                fontSizeVal={'20px'}
              />
            );
          } else {
            return +value === 4 || +value === 9 ? (
              <CurrencyValue
                value={value}
                leftVal={12 * index}
                translateVal={2 + index}
                fontSizeVal={'22px'}
              />
            ) : (
              <CurrencyValue
                value={value}
                leftVal={12 * index}
                translateVal={3 + index}
                fontSizeVal={'20px'}
              />
            );
          }
        })}
      </span>
    </div>
  );
}

export default CurrencyValues;
