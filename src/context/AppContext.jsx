import { createContext, useState } from "react";
import axios from "axios";

export const appContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  const appValues = {
    loading,
    setLoading,
    api,
  };
  return (
    <appContext.Provider value={appValues}>{children}</appContext.Provider>
  );
};

export default AppContextProvider;
