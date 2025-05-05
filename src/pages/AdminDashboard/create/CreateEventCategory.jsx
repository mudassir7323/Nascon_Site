import { useState } from "react"
import BaseUrl from "../../../BaseUrl"
import axios from "axios"

function CreateEventCategory() {
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  })

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: "", message: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("access_token")
    setLoading(true)
    setFeedback({ type: "", message: "" })

    try {
      const response = await axios.post(`${BaseUrl}/event-categories/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Event Category Created:", response.data)
      setFeedback({
        type: "success",
        message: "Event category created successfully!",
      })
      setFormData({ category_name: "", description: "" }) // reset
    } catch (error) {
      console.error("Failed to create event category:", error)
      setFeedback({
        type: "danger",
        message: "Failed to create event category. Please try again.",
      })
    }
    setLoading(false)
  }

  const handleReset = () => {
    setFormData({ category_name: "", description: "" });
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          {feedback.message && (
            <div className={`alert alert-${feedback.type} alert-dismissible fade show mb-4`} role="alert">
              {feedback.type === "success" ? (
                <i className="bi bi-check-circle-fill me-2"></i>
              ) : (
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
              )}
              {feedback.message}
              <button
                type="button"
                className="btn-close"
                onClick={() => setFeedback({ type: "", message: "" })}
              ></button>
            </div>
          )}

          <div className="card shadow-sm border-0">
            <div className="card-header bg-white text-secondary py-3">
              <h5 className="mb-0">Create Event Category</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="mb-3">
                  <label htmlFor="category_name" className="form-label fw-semibold">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="category_name"
                    className="form-control form-control-lg shadow-sm"
                    placeholder="Enter category name"
                    value={formData.category_name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="form-control form-control-lg shadow-sm"
                    rows="3"
                    placeholder="Enter a brief description of this category"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg shadow-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center">

                        <span>Create Category</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer bg-light p-3 d-flex justify-content-between align-items-center">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                All fields are required
              </small>
              <small className="text-muted">&copy; {new Date().getFullYear()} Event Admin Panel</small>
            </div>
          </div>

          <div className="text-center mt-4">
            <a href="#" className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-arrow-left me-1"></i>
              Back to Categories
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEventCategory
