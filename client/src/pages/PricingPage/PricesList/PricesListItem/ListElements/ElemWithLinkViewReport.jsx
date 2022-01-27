import React from 'react';
import classNames from 'classnames';

function ElemWithLinkViewReport (props) {
  const {
    innerItem,
    listElementsClasses: { showedElemClass, innerShowedElementClass }
  } = props;
  const linkStr = 'View Sample Report';
  const iWithoutSpaces = innerItem.text.split(' ').join('');
  const innerElemClass = classNames(showedElemClass, innerShowedElementClass);

  if (iWithoutSpaces.indexOf(linkStr.split(' ').join('')) !== -1) {
    let mainStr = '';
    const mainStrArr = innerItem.text.split(' ');

    for (let i = 0; i < mainStrArr.length; i++) {
      if (
        mainStrArr[i] !== 'View' &&
        mainStrArr[i] !== 'Sample' &&
        mainStrArr[i] !== 'Report'
      ) {
        mainStr += mainStrArr[i] + ' ';
      }
    }

    return (
      <p className={innerElemClass} data-tooltip={innerItem.tooltip}>
        <i style={{ marginRight: '5px' }} className='fas fa-check' />
        <span>{mainStr}</span>
        <br />
        <a
          style={{ textDecoration: 'none' }}
          href='https://www.squadhelp.com/assets/nimages/AudienceTestingReport.pdf'
        >
          {linkStr}
        </a>
      </p>
    );
  }
  return (
    <p className={innerElemClass} data-tooltip={innerItem.tooltip}>
      <i style={{ marginRight: '5px' }} className='fas fa-check' />
      <span>{innerItem.text}</span>
    </p>
  );
}

export default ElemWithLinkViewReport;
