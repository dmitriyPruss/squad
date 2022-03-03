import React from "react";
import ManagedItems from "./ManagedItems";
import AccordionItem from "./AccordionItem";
import CONSTANTS from "../../../../constants";

function InfoItem(props) {
  const {
    info: { buttonText, infoText, listText, linkText },
    sectionId,
    index,
  } = props;

  const {
    HOW_IT_WORKS: { SQUADHELP_LINKS },
  } = CONSTANTS;

  if (sectionId === "managed") {
    return <ManagedItems index={index} info={props.info} />;
  }

  if (listText && linkText) {
    return (
      <AccordionItem index={index} buttonText={buttonText}>
        <p>{infoText}</p>
        <ul style={{ listStyle: "disc" }}>
          {listText.map((i, index) =>
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
            <li key={index}>
              <a href={SQUADHELP_LINKS[index]}>{i}</a>
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
            <a href={linkText.path}> {linkText.name}</a> {infoText[1]}
          </>
        ) : (
          <>
            {infoText}
            <a href={linkText.path}> {linkText.name}</a>
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
