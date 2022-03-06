import React from "react";
import ElemWithLinkViewReport from "./ElemWithLinkViewReport";
import CONSTANTS from "../../../../../constants";

function ListElements(props) {
  const {
    options,
    listElementsClasses: {
      optionsListClass,
      showedElemClass,
      unshowedElemClass,
    },
  } = props;

  const {
    PRICING_PAGE: { managedContestsLink },
  } = CONSTANTS;

  return (
    <ul className={optionsListClass}>
      {options.map((o, i) => {
        if (Array.isArray(o)) {
          return (
            <li key={i}>
              {o.map((item, index) =>
                Array.isArray(item) ? (
                  item.map((innerItem, index) => (
                    <ElemWithLinkViewReport
                      key={index}
                      innerItem={innerItem}
                      listElementsClasses={props.listElementsClasses}
                    />
                  ))
                ) : (
                  <div
                    key={index}
                    className={showedElemClass}
                    data-tooltip={item["tooltip"]}
                  >
                    {item["text"]}
                  </div>
                )
              )}
            </li>
          );
        } else if (typeof o === "string") {
          return o.indexOf("Learn") === 0 ? (
            <li key={i} className={unshowedElemClass}>
              {o.split("|")[0]}
              <a style={{ textDecoration: "none" }} href={managedContestsLink}>
                {o.split("|")[1]}
              </a>
            </li>
          ) : (
            <li key={i} className={unshowedElemClass}>
              {o}
            </li>
          );
        } else {
          return (
            <li className={showedElemClass} data-tooltip={o["tooltip"]} key={i}>
              {o["text"]}
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ListElements;
