import React from "react";
import styles from "./ContestContainer.module.sass";
import SpinnerLoader from "../SpinnerLoader";

class ContestsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = () => {
    const { haveMore, loadMore, children } = this.props;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore) {
        loadMore(children.length);
      }
    }
  };

  render() {
    const { isFetching, children } = this.props;

    if (!isFetching && children.length === 0) {
      return <div className={styles.notFound}>Nothing not found</div>;
    }
    return (
      <>
        {isFetching && (
          <li key={0} className={styles.spinnerContainer}>
            <SpinnerLoader />
          </li>
        )}
        <ul>{children}</ul>
      </>
    );
  }
}

export default ContestsContainer;
