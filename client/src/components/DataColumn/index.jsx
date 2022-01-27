import { useState, useEffect } from 'react';

function DataColumn (props) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const { fileName, render } = props;

  const loadData = () => {
    setIsFetching(true);

    fetch(fileName)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return render({ data, isFetching, error });
}

export default DataColumn;
