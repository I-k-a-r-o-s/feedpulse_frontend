const FeedbackCard = ({ item, loading, updateStatus, handleDelete }) => {
  const sentimentColors = {
    positive: "badge-success",
    negative: "badge-error",
    neutral: "badge-warning",
  };

  const statusColors = {
    New: "badge-info",
    "In Review": "badge-warning",
    Resolved: "badge-success",
  };

  const priorityColors = {
    High: "text-error",
    Medium: "text-warning",
    Low: "text-success",
  };

  return (
    <div className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-shadow duration-300 max-w-2xl">
      <div className="card-body space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="card-title text-lg md:text-xl line-clamp-2">
            {item.title || "Title"}
          </h2>
          <div
            className={`badge badge-lg ${sentimentColors[item.ai_sentiment?.toLowerCase()] || "badge-neutral"}`}
          >
            {item.ai_sentiment || "Sentiment"}
          </div>
        </div>

        <div className="divider my-0"></div>

        {/* Description Section */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-base-content/70">
            Description
          </p>
          <p className="text-base leading-relaxed">
            {item.description || "No description provided"}
          </p>
        </div>

        {/* AI Summary Section */}
        {item.ai_summary && (
          <div className="alert alert-info">
            <div>
              <h3 className="font-semibold">AI Summary</h3>
              <div className="text-sm text-info-content/90">
                {item.ai_summary}
              </div>
            </div>
          </div>
        )}

        {/* Submitter Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p className="font-semibold text-base-content/70">Submitter Name</p>
            <p className="text-base">{item.submitterName || "Not provided"}</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-base-content/70">
              Submitter Email
            </p>
            <p className="text-base truncate">
              {item.submitterEmail || "Not provided"}
            </p>
          </div>
        </div>

        {/* Status Update */}
        <div className="form-control w-full">
          <label className="label pb-2">
            <span className="label-text font-semibold">
              Status:{" "}
              <span
                className={`badge ${statusColors[item.status] || "badge-neutral"}`}
              >
                {item.status}
              </span>
            </span>
          </label>
          <select
            className="select select-bordered select-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
            onChange={(e) => updateStatus(item._id, e.target.value)}
          >
            <option value="" hidden></option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Metadata Badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="badge badge-outline gap-1">
              <span className="font-semibold">Priority:</span>
              <span
                className={
                  priorityColors[item.ai_priority] || "text-base-content"
                }
              >
                {item.ai_priority || "Not set"}
              </span>
            </div>
            <div className="badge badge-outline gap-1">
              <span className="font-semibold">Category:</span>
              {item.ai_category || "Not set"}
            </div>
            <div className="badge badge-outline gap-1">
              <span className="font-semibold">Date:</span>
              {item.updatedAt
                ? new Date(item.updatedAt).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end gap-2 pt-2">
          <button
            className="btn btn-error btn-sm md:btn-md"
            onClick={() => handleDelete(item._id)}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeedbackCard;
