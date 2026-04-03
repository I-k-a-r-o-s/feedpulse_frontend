import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/admin/Dashboard";
import { useContext } from "react";
import { appContext } from "./context/AppContext";

const App = () => {
  const { admin } = useContext(appContext);
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        {admin ? (
          <Route path="*" element={<Dashboard />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Dashboard />} />
          </>
        )}       
      </Routes>
    </div>
  );
};
export default App;
