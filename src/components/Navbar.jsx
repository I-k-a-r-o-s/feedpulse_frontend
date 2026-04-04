import { VscFeedback } from "react-icons/vsc";
import AdminLoginModal from "./AdminLoginModal";
import { useContext } from "react";
import { appContext } from "../context/AppContext";
import { RxDropdownMenu } from "react-icons/rx";

const Navbar = () => {
  const {
    admin,
    logOut,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
  } = useContext(appContext);

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50 border-b border-base-300">
      <div className="navbar-start">
        <button className="btn btn-ghost gap-2 text-lg md:text-xl font-bold">
          <VscFeedback size={24} className="text-primary" />
          <span className="hidden sm:inline">FeedPulse</span>
        </button>
      </div>

      {admin && (
        <div className="navbar-center hidden md:flex gap-2">
          <div className="join">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered select-sm join-item focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Filter by category"
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
              className="select select-bordered select-sm join-item focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      )}

      <div className="navbar-end gap-2">
        {admin && (
          <div className="dropdown dropdown-end md:hidden">
            <button className="btn btn-ghost btn-circle btn-sm" tabIndex={0} aria-label="Filter menu">
              <RxDropdownMenu size={20} />
            </button>
            <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select select-bordered select-sm w-full"
                >
                  <option value="">All Categories</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Improvement">Improvement</option>
                  <option value="Other">Other</option>
                </select>
              </li>
              <li>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="select select-bordered select-sm w-full"
                >
                  <option value="">All Status</option>
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </li>
            </ul>
          </div>
        )}

        {admin ? (
          <button 
            className="btn btn-outline btn-sm md:btn-md" 
            onClick={logOut}
          >
            Logout
          </button>
        ) : (
          <AdminLoginModal />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
