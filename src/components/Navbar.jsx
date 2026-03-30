import { VscFeedback } from "react-icons/vsc";
import AdminLoginModal from "./AdminLoginModal";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">
          <VscFeedback size={20} />
          FeedPulse
        </a>
      </div>
      <div className="navbar-end">
        <AdminLoginModal/>
      </div>
    </div>
  );
};
export default Navbar;
