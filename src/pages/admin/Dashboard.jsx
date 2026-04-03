import { useContext, useEffect, useState } from "react";
import { appContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import FeedbackCard from "../../components/FeedbackCard";

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
        // Update the feedback in the state
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

  useEffect(() => {
    getAllFeedbacks();
  }, []);
  return (
    <div className="hero bg-base-200 min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Total Feedbacks</div>
            <div className="stat-value">{feedback.length}</div>
          </div>
        </div>
        <div className="grid grid-cols-1">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((item) => (
              <FeedbackCard
                key={item._id}
                item={item}
                loading={loading}
                updateStatus={updateStatus}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="flex w-52 flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <span className="skeleton skeleton-text">No Feedbacks Yet!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
