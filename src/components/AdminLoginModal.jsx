import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { appContext } from "../context/AppContext";

const AdminLoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading } = useContext(appContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="btn btn-primary btn-sm sm:btn-md"
        onClick={() => document.getElementById("admin_login_modal").showModal()}
      >
        Login
      </button>

      <dialog
        id="admin_login_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-full max-w-md rounded-3xl border border-base-300/60 bg-base-100 p-6 shadow-2xl sm:p-8">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
            onClick={() => document.getElementById("admin_login_modal").close()}
            aria-label="Close login modal"
            type="button"
          >
            ✕
          </button>

          <div className="text-center">
            <h3 className="text-2xl font-bold">Please Login to Continue.</h3>
            <p className="mt-2 text-sm opacity-70">
              Sign in to manage your cart and place orders faster.
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="w-full">
              <fieldset className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="label px-0 pb-1 pt-0">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full rounded-2xl"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="label px-0 pb-1 pt-0">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full rounded-2xl pr-12"
                      placeholder="Password"
                      required
                      value={formData.password}
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
                      className="absolute inset-y-0 right-0 flex items-center rounded-r-2xl px-3 text-base-content/60 hover:text-base-content"
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full rounded-2xl"
                  type="submit"
                  onClick={() =>
                    document.getElementById("admin_login_modal").close()
                  }
                >
                  {loading ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    <>
                      Login
                      <LuLogIn size={20} />
                    </>
                  )}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default AdminLoginModal;
