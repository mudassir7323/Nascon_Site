import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

function ViewSponsorPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const accessToken = localStorage.getItem('access_token');

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/sponsorship/packages/?skip=0&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: 'application/json',
          },
        }
      );
      setPackages(response.data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setMessage('❌ Failed to load sponsor packages.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;

    try {
      await axios.delete(`${BaseUrl}/sponsorship/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
      });
      setMessage('✅ Package deleted successfully!');
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('❌ Failed to delete package.');
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        View Sponsor Packages
      </h2>

      {message && (
        <div className={`text-center mb-4 font-semibold ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : packages.length === 0 ? (
        <p className="text-center text-gray-600">No sponsor packages found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Package Name</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Benefits</th>
                  <th className="py-3 px-4 text-left">Max Sponsors</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="py-3 px-4">{pkg.package_name}</td>
                    <td className="py-3 px-4">{pkg.description}</td>
                    <td className="py-3 px-4">{pkg.price}</td>
                    <td className="py-3 px-4">{pkg.benefits}</td>
                    <td className="py-3 px-4">{pkg.max_sponsors}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-6 md:hidden">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-blue-700 mb-2">{pkg.package_name}</h3>
                <p><span className="font-semibold">Description:</span> {pkg.description}</p>
                <p><span className="font-semibold">Price:</span> {pkg.price}</p>
                <p><span className="font-semibold">Benefits:</span> {pkg.benefits}</p>
                <p><span className="font-semibold">Max Sponsors:</span> {pkg.max_sponsors}</p>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm w-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewSponsorPackages;
