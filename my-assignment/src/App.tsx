import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Table from "./Components/Table";
import { fetchTableData } from "./Utils";
import { FormatedTableResponseItem } from "./Types/Api";
import Loader from "./Components/Loader";
import ErrorView from "./Components/ErrorView";

const App = () => {
  const [data, setData] = useState<FormatedTableResponseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState({
    isError: false,
    errorMessage: "",
  });

  const fetchApiData = useCallback(() => {
    setLoading(true);
    fetchTableData(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((res) => {
        setLoading(false);
        setErrorData({ isError: false, errorMessage: "" });
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setErrorData({ isError: true, errorMessage: err.message });
      });
  }, []);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  if (loading) {
    return <Loader />;
  }
  if (errorData.isError) {
    return (
      <ErrorView errorMessage={errorData.errorMessage} onRetry={fetchApiData} />
    );
  }

  return <Table paginationEnabled={true} data={data} />;
};

export default App;
