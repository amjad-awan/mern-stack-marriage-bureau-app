import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getGrooms } from "../ServerRequests/groomRequest";
import { getURLParams } from "../helpers/URLParams";

const GroomContext = createContext();

const GroomProvider = ({ children }) => {
  const [grooms, setGrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const urlParams = getURLParams();
  useEffect(() => {
    setParams({
      ...params,
      page: page,
    });
  }, [page]);

  const [totalGrooms, setTotalGrooms] = useState(null);
  const [params, setParams] = useState({
    page: page,
    limit: 12,
    ...urlParams,
  });
  console.log("32", params);

  return (
    <GroomContext.Provider
      value={{
        grooms,
        setParams,
        params,
        setPage,
        setGrooms,
        page,
        totalGrooms,
        setLoading,
        setTotalGrooms,
        loading,
      }}
    >
      {children}
    </GroomContext.Provider>
  );
};

export default GroomProvider;

export const useGrooms = () => {
  return useContext(GroomContext);
};
