import React, { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateExpense() {
    const [formData, setFormData] = useState({
        expense_category: '',
        description: '',
        amount: '',
        expense_date: '',
        receipt_url: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const accessToken = localStorage.getItem('access_token');

    const expenseCategories = [
        'Venue',
        'Catering',
        'Marketing',
        'Equipment',
        'Transport',
        'Miscellaneous'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.post(`${BaseUrl}/expenses/`, {
                ...formData,
                amount: parseFloat(formData.amount)
            }, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            setMessage('Expense created successfully!');
            setFormData({
                expense_category: '',
                description: '',
                amount: '',
                expense_date: '',
                receipt_url: ''
            });
        } catch (err) {
            console.error('Failed to create expense:', err.response?.data || err.message);
            const errorMsg = err.response?.data?.detail?.[0]?.msg || 'Failed to create expense.';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container p-4">
            <h2 className="mb-4">Create Expense</h2>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Expense Category</label>
                    <select
                        name="expense_category"
                        value={formData.expense_category}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select a category</option>
                        {expenseCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="form-control"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Expense Date</label>
                    <input
                        type="date"
                        name="expense_date"
                        value={formData.expense_date}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Receipt URL</label>
                    <input
                        type="text"
                        name="receipt_url"
                        value={formData.receipt_url}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default CreateExpense;
