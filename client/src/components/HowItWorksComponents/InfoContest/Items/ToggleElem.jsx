import React, { useState } from 'react';
import ButtonItem from './ButtonItem';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function ToggleElem ({ children, eventKey, callback, index }) {
  const initView = index === 0 ? true : false;

  const [view, setView] = useState(initView);

  const decoratedClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const changeView = () => setView(!view);

  return (
    <ButtonItem
      children={children}
      decoratedClick={decoratedClick}
      view={view}
      changeView={changeView}
    />
  );
}

export default ToggleElem;
