import React from 'react';
import AccordionItem from './AccordionItem';

function InfoItem (props) {
  const {
    info: { buttonText, infoText, listText, linkText },
    sectionId,
    index
  } = props;

  const squadLinks = [
    'https://www.squadhelp.com/Name-Ideas',
    'https://www.squadhelp.com/tagline-slogan-ideas',
    'https://www.squadhelp.com/logo-design-examples'
  ];

  if (sectionId === 'managed') {
    if (listText && linkText) {
      return (
        <AccordionItem index={index} buttonText={buttonText}>
          <p>{infoText}</p>
          <ul style={{ listStyle: 'disc' }}>
            {listText.map((i, index) => {
              if (index <= 2) {
                return <li>{i}</li>;
              }
              if (index === 3) {
                return null;
              }
              if (index === listText.length - 1) {
                return (
                  <li>
                    {listText[index - 1]}
                    <a href={linkText.path}>{linkText.name}</a>
                    {i}
                  </li>
                );
              }
            })}
          </ul>
        </AccordionItem>
      );
    }

    if (linkText) {
      return (
        <AccordionItem index={index} buttonText={buttonText}>
          <ul style={{ listStyle: 'none' }}>
            {infoText.map((i, index) =>
              index === 2 ? (
                <li>
                  {i} <a href={linkText.path}>{linkText.name}</a>
                </li>
              ) : (
                <li>{i}</li>
              )
            )}
          </ul>
        </AccordionItem>
      );
    }

    if (listText) {
      return (
        <AccordionItem index={index} buttonText={buttonText}>
          <p>{infoText}</p>
          <ul style={{ listStyle: 'disc' }}>
            {listText.map(i => (
              <li>{i}</li>
            ))}
          </ul>
        </AccordionItem>
      );
    }
  }

  if (listText && linkText) {
    return (
      <AccordionItem index={index} buttonText={buttonText}>
        <p>{infoText}</p>
        <ul style={{ listStyle: 'disc' }}>
          {listText.map((i, index) =>
            index === 2 ? (
              <li>
                {i} <a href={linkText.path}>{linkText.name}</a>
              </li>
            ) : (
              <li>{i}</li>
            )
          )}
        </ul>
      </AccordionItem>
    );
  }

  if (listText) {
    return (
      <AccordionItem index={index} buttonText={buttonText}>
        <p>{infoText}</p>
        <ul style={{ listStyle: 'disc' }}>
          {listText.map((i, index) => (
            <li>
              <a href={squadLinks[index]}>{i}</a>
            </li>
          ))}
        </ul>
      </AccordionItem>
    );
  }

  if (linkText) {
    return (
      <AccordionItem index={index} buttonText={buttonText}>
        {Array.isArray(infoText) ? (
          <>
            {infoText[0]}
            <a href={linkText.path}>{linkText.name}</a> {infoText[1]}
          </>
        ) : (
          <>
            {infoText}
            <a href={linkText.path}>{linkText.name}</a>
          </>
        )}
      </AccordionItem>
    );
  }

  return (
    <AccordionItem index={index} buttonText={buttonText}>
      {infoText}
    </AccordionItem>
  );
}

export default InfoItem;
