import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const appContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials:true
  });
  const appValues = {
    loading,
    setLoading,
    api,
    navigate,
  };
  return (
    <appContext.Provider value={appValues}>{children}</appContext.Provider>
  );
};

export default AppContextProvider;
