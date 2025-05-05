import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewExpenses() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('access_token');

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/expenses/?skip=0&limit=100`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setExpenses(res.data.expenses);
        } catch (err) {
            console.error('Failed to fetch expenses:', err);
            setError('Failed to fetch expenses.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) return <p className="p-4">Loading expenses...</p>;
    if (error) return <p className="p-4 text-danger">{error}</p>;

    return (
        <div className="container p-4">
            <h2 className="mb-4">View Expenses</h2>

            {/* Desktop Table */}
            <div className="d-none d-md-block">
                <table className="table table-striped table-bordered rounded-lg">
                    <thead className="bg-light">
                        <tr>
                            <th className="text-left">Expense Category</th>
                            <th className="text-left">Description</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Expense Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="py-2">{expense.expense_category}</td>
                                <td className="py-2">{expense.description}</td>
                                <td className="py-2">{expense.amount}</td>
                                <td className="py-2">{new Date(expense.expense_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="d-md-none">
                {expenses.map((expense) => (
                    <div key={expense.id} className="card mb-4">
                        <div className="card-body">
                            <p><strong>Expense Category:</strong> {expense.expense_category}</p>
                            <p><strong>Description:</strong> {expense.description}</p>
                            <p><strong>Amount:</strong> {expense.amount}</p>
                            <p><strong>Expense Date:</strong> {new Date(expense.expense_date).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewExpenses;
