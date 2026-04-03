import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GoCheck } from "react-icons/go";
import { appContext } from "../context/AppContext";

const Home = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    submitterName: "",
    submitterEmail: "",
  });
  const { loading, setLoading, api } = useContext(appContext);

  const descriptionLength = formData.description.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await api.post("/api/feedback/", formData);
      if (data.success) {
        toast.success("Feedback Submitted Successfully!");
        setFormData({
          title: "",
          description: "",
          category: "",
          submitterName: "",
          submitterEmail: "",
        });
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
    <div className="hero bg-base-100 min-h-[calc(100vh-4rem)] py-8 md:py-12">
      <div className="hero-content w-full px-4 md:px-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-2">
              Share Your Feedback
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body space-y-6">
                {/* Title Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-base-content">
                      Feedback Title
                    </span>
                    <span className="label-text-alt text-xs">Required</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    placeholder="e.g:- Requesting a new feature"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-base-content">
                      Description
                    </span>
                    <span className="label-text-alt text-xs">Required</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-28 md:h-32 resize-none focus:textarea-primary transition-colors"
                    placeholder="Please describe your feedback in detail..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    minLength={20}
                  />
                  <label className="label pt-1 flex items-center gap-1">
                    <span
                      className={`label-text-alt text-xs flex items-center gap-1 ${
                        descriptionLength < 20 ? "text-warning" : "text-success"
                      }`}
                    >
                      {descriptionLength < 20 ? (
                        `${20 - descriptionLength} more characters required`
                      ) : (
                        <>
                          <GoCheck size={20} />
                          <span>Minimum met</span>
                        </>
                      )}
                    </span>
                  </label>
                </div>

                {/* Category Select */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-base-content">
                      Category
                    </span>
                    <span className="label-text-alt text-xs">Required</span>
                  </label>
                  <select
                    className="select select-bordered w-full focus:select-primary transition-colors"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    <option value="Bug">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Improvement">Improvement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Divider */}
                <div className="divider my-2">Optional Information</div>

                {/* Name Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-base-content">
                      Your Name
                    </span>
                    <span className="label-text-alt text-xs text-base-content/50">
                      Optional
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    placeholder="Your name (optional)"
                    name="name"
                    value={formData.submitterName}
                    onChange={handleChange}
                  />
                </div>

                {/* Email Input */}
                <div className="form-control w-full">
                  <label className="label pb-2">
                    <span className="label-text font-semibold text-base-content">
                      Email Address
                    </span>
                    <span className="label-text-alt text-xs text-base-content/50">
                      Optional
                    </span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered validator w-full focus:input-primary transition-colors"
                    placeholder="your.email@example.com (optional)"
                    name="email"
                    value={formData.submitterEmail}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="card-actions justify-center md:justify-end pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full sm:w-auto gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
