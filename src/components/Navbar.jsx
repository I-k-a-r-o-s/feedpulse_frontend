import { VscFeedback } from "react-icons/vsc";
import AdminLoginModal from "./AdminLoginModal";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <VscFeedback size={20} />
          FeedPulse
        </Link>
      </div>
      <div className="navbar-end">
        <AdminLoginModal />
      </div>
    </div>
  );
};
export default Navbar;
