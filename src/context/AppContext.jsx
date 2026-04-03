import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const appContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const loadAdmin = localStorage.getItem("admin");
    if (loadAdmin) {
      setAdmin(JSON.parse(loadAdmin));
    }
  }, []);

  const saveAdminToLocalStorage = (adminData) => {
    if (adminData) {
      localStorage.setItem("admin", JSON.stringify(adminData));
    } else {
      localStorage.removeItem("admin");
    }
    setAdmin(adminData);
  };

  const logOut = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (data.success) {
        saveAdminToLocalStorage(null);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error("Failed to Log out!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error!");
      console.log("Error response:", error.response?.data);
    }
  };

  const appValues = {
    loading,
    setLoading,
    api,
    navigate,
    saveAdminToLocalStorage,
    admin,
    logOut,
  };
  return (
    <appContext.Provider value={appValues}>{children}</appContext.Provider>
  );
};

export default AppContextProvider;
