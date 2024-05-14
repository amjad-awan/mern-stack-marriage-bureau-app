import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getGrooms } from "../ServerRequests/groomRequest";

const GroomContext = createContext();

const GroomProvider = ({ children }) => {
  const [grooms, setGrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage]= useState(1)
  console.log('page: grooms', page,grooms);
  useEffect(()=>{
    setParams({
      ...params, page:page
    })

  },[page])

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
  console.log(params)

  const fetchGrooms = async () => {
    try {
      setLoading(true);
      const response = await getGrooms('groom/get-grooms', params);
      console.log("response",response)
      setGrooms(response.data.data);
      setTotalpages(response.data.totalGrooms)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching grooms:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrooms();
  }, [params]); // Refetch grooms when params change

  return (
    <GroomContext.Provider
      value={{
        grooms,
        setParams,
        params,
        setPage,
        page,
        totalPages,
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
