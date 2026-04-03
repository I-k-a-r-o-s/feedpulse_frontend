import { VscFeedback } from "react-icons/vsc";
import AdminLoginModal from "./AdminLoginModal";
import { Link } from "react-router";
import { useContext } from "react";
import { appContext } from "../context/AppContext";

const Navbar = () => {
  const { admin, logOut } = useContext(appContext);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost text-xl">
          <VscFeedback size={20} />
          FeedPulse
        </Link>
      </div>
      {admin ? (
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Category</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <span>Bug</span>
                  </li>
                  <li>
                    <span>Feature Request</span>
                  </li>
                  <li>
                    <span>Improvement</span>
                  </li>
                  <li>
                    <span>Other</span>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Status</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <span>New</span>
                  </li>
                  <li>
                    <span>In Review</span>
                  </li>
                  <li>
                    <span>Resolved</span>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
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
