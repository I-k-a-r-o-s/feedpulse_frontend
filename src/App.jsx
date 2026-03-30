import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Navbar/>
      <Home />
    </div>
  );
};
export default App;
