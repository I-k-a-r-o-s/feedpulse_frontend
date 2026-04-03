import { VscFeedback } from "react-icons/vsc";
import AdminLoginModal from "./AdminLoginModal";
import { useContext } from "react";
import { appContext } from "../context/AppContext";

const Navbar = () => {
  const { admin, logOut, selectedCategory, setSelectedCategory, selectedStatus, setSelectedStatus } = useContext(appContext);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <button className="btn btn-ghost text-xl">
          <VscFeedback size={20} />
          FeedPulse
        </button>
      </div>
      {admin ? (
        <div className="navbar-center">
          <fieldset className="fieldset flex flex-row">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select"
            >
              <option value="">All Categories</option>
              <option value="Bug">Bug</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Improvement">Improvement</option>
              <option value="Other">Other</option>
            </select>
          
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </fieldset>
        </div>
      ) : (
        <></>
      )}
      <div className="navbar-end">
        {admin ? (
          <button className="btn" onClick={logOut}>
            Logout
          </button>
        ) : (
          <AdminLoginModal />
        )}
      </div>
    </div>
  );
};
export default Navbar;
