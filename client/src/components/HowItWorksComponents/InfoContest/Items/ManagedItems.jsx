import React from "react";
import AccordionItem from "./AccordionItem";

function ManagedItems(props) {
  const {
    index,
    info: { buttonText, infoText, listText, linkText },
  } = props;

  if (listText && linkText) {
    return (
      <AccordionItem index={index} buttonText={buttonText}>
        <p>{infoText}</p>
        <ul style={{ listStyle: "disc" }}>
          {listText.map((i, index) => {
            switch (index) {
              case listText.length - 1:
                return (
                  <li key={index}>
                    {listText[index - 1]}
                    <a href={linkText.path}> {linkText.name} </a>
                    {i}
                  </li>
                );
              case 0:
              case 1:
              case 2:
                return <li key={index}>{i}</li>;
              default:
                return null;
            }
          })}
        </ul>
      </AccordionItem>
    );
  }

  if (linkText) {
    return (
      <AccordionItem index={index} buttonText={buttonText}>
        <ul style={{ listStyle: "none" }}>
          {infoText.map((i, index) =>
            index === 2 ? (
              <li key={index}>
                {i} <a href={linkText.path}>{linkText.name}</a>
              </li>
            ) : (
              <li key={index}>{i}</li>
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
        <ul style={{ listStyle: "disc" }}>
          {listText.map((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ul>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem index={index} buttonText={buttonText}>
      {infoText}
    </AccordionItem>
  );
}

export default ManagedItems;
