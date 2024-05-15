import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getGrooms } from "../ServerRequests/groomRequest";

const GroomContext = createContext();

const GroomProvider = ({ children }) => {
  const [grooms, setGrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]= useState(1)
  console.log('page: grooms', page);
  // useEffect(()=>{
  //   setParams({
  //     ...params, page:page
  //   })

  // },[page])

  const [totalPages, setTotalpages]= useState(null)
  const [params, setParams] = useState({
    page: page,
    limit: 10,
    cast: "",
    search:"",
    height: "",
    qualification: "",
    martialStatus: "",
    sect: "",
    city: "",
    gender:"",
    nationality: ""
  });
  console.log("32",params)



  return (
    <GroomContext.Provider
      value={{
        grooms,
        setParams,
        params,
        setPage,
        setGrooms,
        page,
        totalPages,
        setLoading,
        setTotalpages,
        loading
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
