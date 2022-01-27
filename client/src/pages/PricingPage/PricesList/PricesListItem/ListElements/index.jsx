import React from 'react';
import ElemWithLinkViewReport from './ElemWithLinkViewReport';

function ListElements (props) {
  const {
    options,
    listElementsClasses: {
      optionsListClass,
      showedElemClass,
      unshowedElemClass,
    },
  } = props;

  return (
    <ul className={optionsListClass}>
      {options.map((o, i) => {
        if (Array.isArray(o)) {
          return (
            <li key={i}>
              {o.map((item, index) =>
                Array.isArray(item) ? (
                  item.map(innerItem => (
                    <ElemWithLinkViewReport
                      innerItem={innerItem}
                      listElementsClasses={props.listElementsClasses}
                    />
                  ))
                ) : (
                  <div
                    className={showedElemClass}
                    data-tooltip={item['tooltip']}
                  >
                    {item['text']}
                  </div>
                )
              )}
            </li>
          );
        } else if (typeof o === 'string') {
          return o.indexOf('Learn') === 0 ? (
            <p className={unshowedElemClass}>
              {o.split('|')[0]}
              <a
                style={{ textDecoration: 'none' }}
                href='https://www.squadhelp.com/managed-contests'
              >
                {o.split('|')[1]}
              </a>
            </p>
          ) : (
            <p className={unshowedElemClass}>{o}</p>
          );
        } else {
          return (
            <li className={showedElemClass} data-tooltip={o['tooltip']} key={i}>
              {o['text']}
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ListElements;
