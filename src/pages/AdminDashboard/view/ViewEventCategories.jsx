import { useEffect, useState } from 'react';
import BaseUrl from '../../../BaseUrl';
import axios from 'axios';

function ViewEventCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(10); // Items per page
  const [skip, setSkip] = useState(0); // Offset

  const fetchCategories = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.get(
        `${BaseUrl}/event-categories/?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`${BaseUrl}/event-categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete category');
    }
  };

  const handleNext = () => setSkip(skip + limit);
  const handlePrev = () => setSkip(Math.max(skip - limit, 0));

  useEffect(() => {
    fetchCategories();
  }, [skip]);

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">View Event Categories</h3>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="d-none d-md-block">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.category_name}</td>
                    <td>{cat.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none">
            {categories.map((cat) => (
              <div key={cat.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{cat.category_name}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {cat.description}
                  </p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-primary me-2"
              onClick={handlePrev}
              disabled={skip === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleNext}
              disabled={categories.length < limit}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewEventCategories;
