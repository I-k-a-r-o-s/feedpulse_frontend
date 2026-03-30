import { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    name: "",
    email: "",
  });

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
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="hero bg-base-100 min-h-[calc(100vh-4rem)]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Your Feedback</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <label className="label">Title</label>
              <input
                type="text"
                className="input"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea h-24"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={20}
              ></textarea>
              <span className="label">{descriptionLength}/20 minimum</span>

              <legend className="fieldset-legend">Category</legend>
              <select
                className="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  Pick a Category
                </option>
                <option>Bug</option>
                <option>Feature Request</option>
                <option>Improvement</option>
                <option>Other</option>
              </select>

              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <span className="label">Optional</span>

              <label className="label">Email</label>
              <input
                type="email"
                className="input validator"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="label">Optional</span>

              <button className="btn btn-primary" onSubmit={handleSubmit}>
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
