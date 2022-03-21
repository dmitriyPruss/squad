import React, { useState, useEffect, useMemo } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import calcPeriod from "../helperFuncs/calcPeriod";

function ProgressItem(props) {
  const { progressState, period } = props;

  const initProgBarValue = useMemo(
    () => calcPeriod(progressState, period),
    [progressState, period]
  );

  const [progressBarValue, setProgressBarValue] = useState(initProgBarValue);

  useEffect(() => {
    let progressValueId = setTimeout(function runProgressValue() {
      setProgressBarValue(calcPeriod(progressState, period));

      progressValueId = setTimeout(runProgressValue, 1000);
    }, 1000);

    return () => {
      clearTimeout(progressValueId);
    };
  }, [progressState, period]);

  return <ProgressBar animated variant="primary" now={progressBarValue} />;
}

export default ProgressItem;
