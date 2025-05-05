// CreateFinancialReport.jsx
import React, { useState } from 'react';
import BaseUrl from '../../../BaseUrl';

// Assuming the base URL is correct and accessible
const BASE_API_URL = BaseUrl;

function CreateFinancialReport() {
    const [reportType, setReportType] = useState('daily'); // 'daily', 'weekly', 'monthly', 'custom'
    const [date, setDate] = useState(''); // YYYY-MM-DD
    const [startDate, setStartDate] = useState(''); // YYYY-MM-DD
    const [endDate, setEndDate] = useState(''); // YYYY-MM-DD
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12
    const [reportName, setReportName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
        // Reset fields when type changes to avoid confusion
        setDate('');
        setStartDate('');
        setEndDate('');
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth() + 1);
        setReportName('');
        setMessage('');
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        let url = '';
        let isValid = true;

        switch (reportType) {
            case 'daily':
                if (!date) {
                    setError('Date is required for daily reports.');
                    isValid = false;
                    break;
                }
                url = `${BASE_API_URL}/financial-reports/generate/daily?date=${encodeURIComponent(date)}`;
                break;
            case 'weekly':
                if (!startDate) {
                    setError('Start Date is required for weekly reports.');
                    isValid = false;
                    break;
                }
                // Note: API uses start_date, consistent naming helps
                url = `${BASE_API_URL}/financial-reports/generate/weekly?start_date=${encodeURIComponent(startDate)}`;
                break;
            case 'monthly':
                 if (!year || !month || month < 1 || month > 12) {
                    setError('Valid Year and Month (1-12) are required for monthly reports.');
                    isValid = false;
                    break;
                }
                url = `${BASE_API_URL}/financial-reports/generate/monthly?year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`;
                break;
            case 'custom':
                if (!startDate || !endDate || !reportName) {
                    setError('Start Date, End Date, and Report Name are required for custom reports.');
                    isValid = false;
                    break;
                }
                 if (new Date(startDate) > new Date(endDate)) {
                     setError('Start Date cannot be after End Date.');
                     isValid = false;
                     break;
                 }
                url = `${BASE_API_URL}/financial-reports/generate/custom?start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}&report_name=${encodeURIComponent(reportName)}`;
                break;
            default:
                setError('Invalid report type selected.');
                isValid = false;
        }

        if (!isValid) {
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("access_token");

        try {
            console.log(`Making POST request to: ${url}`);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    // Add any other necessary headers like Authorization if needed
                    'Authorization': `Bearer ${token}`
                },
                 // Body is empty as indicated by `-d ''`
                body: null
            });

            if (!response.ok) {
                let errorBody = 'Unknown error';
                try {
                    const errorData = await response.json();
                    errorBody = errorData.detail || JSON.stringify(errorData);
                } catch (e) {
                   errorBody = await response.text();
                }
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody}`);
            }

            let responseData = {};
            try {
                // Attempt to parse JSON, but handle cases where it might be empty but still successful
                const textResponse = await response.text();
                 if (textResponse) {
                    responseData = JSON.parse(textResponse);
                }
            } catch(e) {
                console.warn("Response might not be JSON, but request succeeded.", e);
            }

            setMessage(`Report generation started successfully for ${reportType}. ${responseData.message || ''}`);
             // Consider resetting fields on success if desired
             // setDate(''); setStartDate(''); setEndDate(''); etc.

        } catch (err) {
            console.error("API call failed:", err);
            setError(`Failed to generate report: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">Generate Financial Report</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Report Type Selector */}
                        <div className="mb-3">
                            <label htmlFor="reportType" className="form-label">Report Type:</label>
                            <select
                                id="reportType"
                                className="form-select"
                                value={reportType}
                                onChange={handleReportTypeChange}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        {/* Conditional Inputs */}
                        {reportType === 'daily' && (
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {reportType === 'weekly' && (
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Week Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {reportType === 'monthly' && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label">Year:</label>
                                    <input
                                        type="number"
                                        id="year"
                                        className="form-control"
                                        value={year}
                                        onChange={(e) => setYear(parseInt(e.target.value, 10))}
                                        required
                                        min="1900"
                                        max="2100"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="month" className="form-label">Month:</label>
                                    <input
                                        type="number"
                                        id="month"
                                        className="form-control"
                                        value={month}
                                        onChange={(e) => setMonth(parseInt(e.target.value, 10))}
                                        required
                                        min="1"
                                        max="12"
                                        placeholder="1-12"
                                    />
                                </div>
                            </>
                        )}

                        {reportType === 'custom' && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="customStartDate" className="form-label">Start Date:</label>
                                    <input
                                        type="date"
                                        id="customStartDate"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customEndDate" className="form-label">End Date:</label>
                                    <input
                                        type="date"
                                        id="customEndDate"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reportName" className="form-label">Report Name:</label>
                                    <input
                                        type="text"
                                        id="reportName"
                                        className="form-control"
                                        value={reportName}
                                        onChange={(e) => setReportName(e.target.value)}
                                        required
                                        placeholder="e.g., Q1_Sales_Summary"
                                    />
                                </div>
                            </>
                        )}

                        {/* Submit Button */}
                        <div className="d-grid gap-2"> {/* Optional: Makes button full width */}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Generating...
                                    </>
                                ) : (
                                    'Generate Report'
                                )}
                            </button>
                        </div>

                        {/* Status Messages */}
                        {message && (
                            <div className="alert alert-success mt-3" role="alert">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}

                    </form>
                </div> {/* End card-body */}
            </div> {/* End card */}
        </div> // End container
    );
}

export default CreateFinancialReport;