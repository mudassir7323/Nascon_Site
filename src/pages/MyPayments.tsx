import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = BaseUrl;
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchMyPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${baseUrl}/payments/my-payments?skip=0&limit=100`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPayments(response.data.payments || []);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load your payment history.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPayments();
  }, [accessToken, baseUrl]);

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading your payment history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <p className="alert alert-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>My Payments</h2>
      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Type</th>
              <th>Registration ID</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.payment_type}</td>
                <td>{payment.registration_id}</td>
                <td>{payment.status}</td>
                <td>{payment.transaction_id}</td>
                <td>{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyPayments;