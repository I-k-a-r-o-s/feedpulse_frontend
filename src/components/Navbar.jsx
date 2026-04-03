import { VscFeedback } from "react-icons/vsc";
import AdminLoginModal from "./AdminLoginModal";
import { useContext } from "react";
import { appContext } from "../context/AppContext";

const Navbar = () => {
  const { admin, logOut } = useContext(appContext);

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
            <select defaultValue="Category" className="select">
              <option disabled={true}>Category</option>
              <option>Bug</option>
              <option>Feature Request</option>
              <option>Improvement</option>
              <option>Other</option>
            </select>
          
            <select defaultValue="Status" className="select">
              <option disabled={true}>Status</option>
              <option>New</option>
              <option>In Review</option>
              <option>Resolved</option>
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
