import React from "react";
import Flickity from "react-flickity-component";
import styles from "./SlideBar.module.sass";
import carouselConstants from "../../carouselConstants";
import "./flickity.css";

const SlideBar = (props) => {
  const { carouselType, images } = props;
  const {
    MAIN_SLIDER,
    EXAMPLE_SLIDER,
    FEEDBACK_SLIDER,
    EXAMPLE_SLIDER_TEXT,
    FEEDBACK_SLIDER_TEXT,
  } = carouselConstants;

  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    switch (carouselType) {
      case MAIN_SLIDER:
        return styles.mainCarousel;
      case EXAMPLE_SLIDER:
        return styles.exampleCarousel;
      case FEEDBACK_SLIDER:
        return styles.feedbackCarousel;
    }
  };

  const renderSlides = () => {
    switch (carouselType) {
      case MAIN_SLIDER: {
        return Object.keys(images).map((key, index) => (
          <img
            src={images[key]}
            alt="slide"
            key={index}
            className={styles["carousel-cell"]}
          />
        ));
      }
      case EXAMPLE_SLIDER: {
        return Object.keys(images).map((key, index) => (
          <div className={styles["example-cell"]} key={index}>
            <img src={images[key]} alt="slide" />
            <p>{EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      }
      case FEEDBACK_SLIDER: {
        return Object.keys(images).map((key, index) => (
          <div className={styles["feedback-cell"]} key={index}>
            <img src={images[key]} alt="slide" />
            <p>{FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      }
    }
  };
  return (
    <Flickity className={getStyleName()} elementType="div" options={options}>
      {renderSlides()}
    </Flickity>
  );
};

export default SlideBar;
