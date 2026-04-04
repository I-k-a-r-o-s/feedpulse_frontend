import { useContext, useEffect, useState } from "react";
import { appContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import FeedbackCard from "../../components/FeedbackCard";
import { BsExclamationCircle } from "react-icons/bs";
import { GoInbox } from "react-icons/go";

const Dashboard = () => {
  const { api, loading, setLoading, selectedCategory, selectedStatus } =
    useContext(appContext);
  const [feedback, setFeedback] = useState([]);

  const getAllFeedbacks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/feedback");
      if (data.success) {
        toast.success(data.message);
        setFeedback(data.allFeedback);
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

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const { data } = await api.patch(`/api/feedback/${id}`, {
        status: newStatus,
      });
      if (data.success) {
        toast.success(data.message);
        setFeedback((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus } : item,
          ),
        );
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

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/api/feedback/${id}`);
      if (data.success) {
        toast.success(data.message);
        getAllFeedbacks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error!");
      console.log("Error response:", error.response?.data);
    }
  };

  const filteredFeedback = feedback.filter((item) => {
    const matchCategory =
      !selectedCategory || item.ai_category === selectedCategory;
    const matchStatus = !selectedStatus || item.status === selectedStatus;
    return matchCategory && matchStatus;
  });

  const stats = {
    total: feedback.length,
    new: feedback.filter((f) => f.status === "New").length,
    inReview: feedback.filter((f) => f.status === "In Review").length,
    resolved: feedback.filter((f) => f.status === "Resolved").length,
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-base-100 to-base-200 py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content">
            Dashboard
          </h1>
          <p className="text-base-content/70">
            Manage and track all feedback submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat bg-base-100 rounded-lg shadow-md border border-base-200">
            <div className="stat-title">Total Feedbacks</div>
            <div className="stat-value text-primary text-3xl">
              {stats.total}
            </div>
            <div className="stat-desc">All submissions</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow-md border border-base-200">
            <div className="stat-title">New</div>
            <div className="stat-value text-info text-3xl">{stats.new}</div>
            <div className="stat-desc">Awaiting review</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow-md border border-base-200">
            <div className="stat-title">In Review</div>
            <div className="stat-value text-warning text-3xl">
              {stats.inReview}
            </div>
            <div className="stat-desc">Currently being processed</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow-md border border-base-200">
            <div className="stat-title">Resolved</div>
            <div className="stat-value text-success text-3xl">
              {stats.resolved}
            </div>
            <div className="stat-desc">Completed</div>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(selectedCategory || selectedStatus) && (
          <div className="alert alert-info shadow-md">
            <BsExclamationCircle size={20} />
            <span>
              {selectedCategory && (
                <span className="badge badge-info mr-2">
                  {selectedCategory}
                </span>
              )}
              {selectedStatus && (
                <span className="badge badge-info">{selectedStatus}</span>
              )}
            </span>
          </div>
        )}

        {/* Feedback List */}
        <div className="space-y-4">
          {loading && !feedback.length ? (
            // Loading Skeleton
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="card bg-base-100 shadow-lg border border-base-200"
                >
                  <div className="card-body space-y-3">
                    <div className="skeleton h-8 w-3/4"></div>
                    <div className="skeleton h-24 w-full"></div>
                    <div className="skeleton h-6 w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredFeedback.length > 0 ? (
            // Feedback Cards
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-base-content/70 font-semibold">
                  Showing {filteredFeedback.length} of {feedback.length}{" "}
                  feedback items
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFeedback.map((item) => (
                  <FeedbackCard
                    key={item._id}
                    item={item}
                    loading={loading}
                    updateStatus={updateStatus}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Empty State
            <div className="card bg-base-100 shadow-lg border border-base-200 border-dashed">
              <div className="card-body flex flex-col items-center justify-center py-12 text-center space-y-4">
                <GoInbox size={20} />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-base-content">
                    No feedback found
                  </h3>
                  <p className="text-base-content/60 max-w-sm">
                    {selectedCategory || selectedStatus
                      ? "No feedback matches your current filters. Try adjusting the filters."
                      : "No feedback submissions yet. Check back soon!"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
