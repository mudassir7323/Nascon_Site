import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewFinancialReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('access_token');

    const fetchReports = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/financial-reports/?skip=0&limit=100`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            setReports(res.data.reports);
        } catch (error) {
            console.error("Failed to fetch reports:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    if (loading) return <p className="p-4">Loading financial reports...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">View Financial Reports</h2>

            {/* Desktop Table */}
            <div className="d-none d-md-block">
                <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Report Name</th>
                            <th>Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Income</th>
                            <th>Total Expense</th>
                            <th>Net Profit</th>
                            <th>Generated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.report_name}</td>
                                <td>{report.report_type}</td>
                                <td>{report.start_date}</td>
                                <td>{report.end_date}</td>
                                <td>{report.total_income}</td>
                                <td>{report.total_expense}</td>
                                <td>{report.net_profit}</td>
                                <td>{new Date(report.generated_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="d-md-none">
                {reports.map((report) => (
                    <div className="card mb-3" key={report.id}>
                        <div className="card-body">
                            <p><strong>Report Name:</strong> {report.report_name}</p>
                            <p><strong>Type:</strong> {report.report_type}</p>
                            <p><strong>Start Date:</strong> {report.start_date}</p>
                            <p><strong>End Date:</strong> {report.end_date}</p>
                            <p><strong>Total Income:</strong> {report.total_income}</p>
                            <p><strong>Total Expense:</strong> {report.total_expense}</p>
                            <p><strong>Net Profit:</strong> {report.net_profit}</p>
                            <p><strong>Generated At:</strong> {new Date(report.generated_at).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewFinancialReports;
