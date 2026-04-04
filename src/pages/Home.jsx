import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GoCheck } from "react-icons/go";
import { appContext } from "../context/AppContext";
import { GrSend } from "react-icons/gr";
import { PiBroomBold } from "react-icons/pi";

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

  const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      submitterName: "",
      submitterEmail: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await api.post("/api/feedback/", formData);
      if (data.success) {
        toast.success("Feedback Submitted Successfully!");
        clearForm();
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
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-base-100 to-base-200 py-4 md:py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-4 md:mb-6 space-y-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Share Your Feedback
          </h1>
          <p className="text-sm md:text-base text-base-content/70 max-w-xl mx-auto">
            Help us improve by sharing your thoughts, suggestions, and bug
            reports. Your feedback is invaluable to our development.
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <form onSubmit={handleSubmit} className="card-body space-y-3 p-4 md:p-6">
            {/* Title Input */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-semibold text-lg">
                  Feedback Title
                </span>
                <span className="badge badge-sm badge-error">Required</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="e.g. Add dark mode support for dashboard"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Description Input */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-semibold text-lg">
                  Description
                </span>
                <span className="badge badge-sm badge-error">Required</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-20 md:h-24 resize-none text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Please describe your feedback in detail. Include context, use cases, and any relevant information..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={20}
                disabled={loading}
              />
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`label-text-alt text-sm flex items-center gap-1.5 transition-colors ${
                    descriptionLength < 20 ? "text-warning" : "text-success"
                  }`}
                >
                  {descriptionLength < 20 ? (
                    <>
                      <span>{20 - descriptionLength} characters remaining</span>
                    </>
                  ) : (
                    <>
                      <GoCheck size={18} />
                      <span>Minimum requirement met</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Category Select */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-semibold text-lg">
                  Category
                </span>
                <span className="badge badge-sm badge-error">Required</span>
              </label>
              <select
                className="select select-bordered w-full text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="" hidden></option>
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
                <span className="label-text font-semibold">Your Name</span>
                <span className="label-text-alt text-xs text-base-content/50">
                  Optional
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Your name"
                name="submitterName"
                value={formData.submitterName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Email Input */}
            <div className="form-control w-full">
              <label className="label pb-2">
                <span className="label-text font-semibold">Email Address</span>
                <span className="label-text-alt text-xs text-base-content/50">
                  Optional
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="your.email@example.com"
                name="submitterEmail"
                value={formData.submitterEmail}
                onChange={handleChange}
                disabled={loading}
              />
              <div className="label">
                <span className="label-text-alt text-xs text-base-content/50">
                  We'll only use this to follow up on your feedback if needed
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-center md:justify-end gap-3 pt-6 border-t border-base-300">
              <button
                type="button"
                className="btn btn-error btn-md md:btn-lg gap-2 min-w-max"
                disabled={loading}
                onClick={clearForm}
              >
                <PiBroomBold size={20} />
                Clear Form
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-md md:btn-lg gap-2 min-w-max"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <GrSend size={20} />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
