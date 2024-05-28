import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});


  useEffect(()=>{

    const authDetails= localStorage.getItem("user")
    if(authDetails){
      setAuth(authDetails)
    }

  },[])

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
