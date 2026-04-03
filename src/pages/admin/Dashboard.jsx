import { useContext, useEffect, useState } from "react";
import { appContext } from "../../context/AppContext";
import toast from "react-hot-toast";

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
      <div className="hero-content text-center">
        <div className="grid grid-cols-1">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((item) => (
              <div className="card bg-base-100 w-96 shadow-sm" key={item._id}>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.title ? item.title : "Title"}
                    <div className="badge badge-secondary">
                      {item.ai_sentiment ? item.ai_sentiment : "Sentiment"}
                    </div>
                  </h2>
                  <p>
                    Description:-
                    {item.description ? item.description : "description"}
                  </p>
                  <p>
                    AI Summary:-{item.ai_summary ? item.ai_summary : "Summary"}
                  </p>
                  <p>
                    Submitter Name:-
                    {item.submitterName ? item.submitterName : "Not Provided"}
                  </p>
                  <p>
                    Submitter Email:-
                    {item.submitterEmail ? item.submitterEmail : "Not Provided"}
                  </p>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Status:-{item.status}
                    </legend>
                    <select
                      className="select"
                      disabled={loading}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                    >
                      <option disabled={true} value="">
                        {item.status}
                      </option>
                      <option value={"New"}>New</option>
                      <option value={"In Review"}>In Review</option>
                      <option value={"Resolved"}>Resolved</option>
                    </select>
                  </fieldset>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                      Priority:-{" "}
                      {item.ai_priority ? item.ai_priority : "Priority"}
                    </div>
                    <div className="badge badge-outline">
                      Category:-{" "}
                      {item.ai_category ? item.ai_category : "Category"}
                    </div>
                    <div className="badge badge-outline">
                      Date:- {item.updatedAt ? item.updatedAt : "Date"}
                    </div>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
