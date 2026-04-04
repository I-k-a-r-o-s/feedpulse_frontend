import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { appContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminLoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, api, navigate, saveAdminToLocalStorage } =
    useContext(appContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Required fields are empty!");
    }

    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/login", formData);
      if (data.success) {
        saveAdminToLocalStorage(data.admin.email);
        toast.success(data.message);
        console.log(data.admin.email);
        setFormData({
          email: "",
          password: "",
        });
        document.getElementById("admin_login_modal").close();
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error!");
      console.log("Error response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary btn-sm md:btn-md"
        onClick={() => document.getElementById("admin_login_modal").showModal()}
      >
        Admin Login
      </button>

      <dialog
        id="admin_login_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-full max-w-md bg-base-100 p-0 shadow-2xl">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4"
            onClick={() => document.getElementById("admin_login_modal").close()}
            aria-label="Close login modal"
            type="button"
          >
            ✕
          </button>

          {/* Header */}
          <div className="bg-linear-to-r from-primary to-primary/70 px-6 py-8 text-primary-content">
            <h3 className="text-2xl font-bold">Admin Dashboard</h3>
            <p className="mt-1 text-sm opacity-90">
              Sign in to manage feedback and settings
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Email Input */}
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="admin@example.com"
                  required
                  value={formData.email}
                  disabled={loading}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Password Input */}
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    disabled={loading}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-base-content/50 hover:text-base-content transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <FaRegEye size={18} />
                    ) : (
                      <FaRegEyeSlash size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="btn btn-primary w-full gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LuLogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="border-t border-base-200 px-6 py-4 text-center text-xs text-base-content/50">
            Enter your admin credentials to access the dashboard
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
export default AdminLoginModal;
