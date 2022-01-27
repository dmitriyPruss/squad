import React from 'react';
import styles from './../InfoContest.module.scss';

function ButtonItem (props) {
  const { children, view, changeView, decoratedClick } = props;

  return (
    <button
      className={styles.launchingButton}
      onClick={() => {
        changeView();
        decoratedClick();
      }}
    >
      <span>{children}</span>
      <span>
        {view ? (
          <i
            style={{
              color: ' #D2D8A1 ',
              transform: 'rotate(90deg)',
              transitionProperty: 'transform, color',
              transitionDuration: '0.5s'
            }}
            class='fas fa-arrow-right'
          ></i>
        ) : (
          <i
            style={{
              color: ' #377dff',
              transform: 'rotate(0deg)',
              transitionProperty: 'transform, color',
              transitionDuration: '0.5s'
            }}
            class='fas fa-arrow-right'
          ></i>
        )}
      </span>
    </button>
  );
}

export default ButtonItem;
