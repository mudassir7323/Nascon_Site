import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'; // Import Bootstrap Button
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function ViewPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentType, setPaymentType] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const accessToken = localStorage.getItem('access_token');

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                skip: 0,
                limit: 100,
            });

            if (paymentType) params.append('payment_type', paymentType);
            if (paymentStatus) params.append('status', paymentStatus);
            if (paymentMethod) params.append('payment_method', paymentMethod);

            const res = await axios.get(`${BaseUrl}/payments/?${params.toString()}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setPayments(res.data.payments);
        } catch (err) {
            console.error('Failed to fetch payments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [paymentType, paymentStatus, paymentMethod]);

    const handleStatusChange = async () => {
        if (!selectedPaymentId || !newStatus) return;

        try {
            const response = await axios.post(
                `${BaseUrl}/payments/${selectedPaymentId}/status/${newStatus}`,
                {}, // Empty body, as per your curl example
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the payment status in the local state
                setPayments(prevPayments =>
                    prevPayments.map(p =>
                        p.id === selectedPaymentId ? { ...p, status: newStatus } : p
                    )
                );
                setIsModalOpen(false); // Close the modal
                setNewStatus('');
            } else {
                alert('Failed to update payment status.'); //  basic error handling
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            alert('An error occurred while updating status.');
        }
    };

    const openStatusModal = (paymentId, currentStatus) => {
        console.log("Status Clicked with id : ", paymentId)
        setSelectedPaymentId(paymentId);
        setNewStatus(currentStatus); // Initialize with current status
        setIsModalOpen(true);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">View Payments</h2>

            {/* Filters */}
            <div className="row mb-4">
                <div className="col-md-4 mb-2">
                    <select
                        className="form-select"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Event Registration">Event Registration</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Merchandise">Merchandise</option>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-md-4 mb-2">
                    <select
                        className="form-select"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </div>
                <div className="col-md-4 mb-2">
                    <select
                        className="form-select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">All Methods</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Online Payment">Online Payment</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading payments...</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="d-none d-md-block">
                        <table className="table table-striped table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Reference ID</th>
                                    <th>Transaction ID</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((p) => (
                                        <tr key={p.id}>
                                            <td>{p.amount}</td>
                                            <td>{p.payment_method}</td>
                                            <td>{p.payment_type}</td>
                                            <td>
                                                <Button
                                                    variant="link"
                                                    onClick={() => openStatusModal(p.id, p.status)}
                                                    className="p-0"
                                                >
                                                    {p.status}
                                                </Button>

                                            </td>
                                            <td>{p.reference_id}</td>
                                            <td>{p.transaction_id}</td>
                                            <td>{new Date(p.created_at).toLocaleString()}</td>
                                            <td>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No payments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="d-md-none">
                        {payments.length > 0 ? (
                            payments.map((p) => (
                                <div key={p.id} className="card mb-3">
                                    <div className="card-body">
                                        <p><strong>Amount:</strong> {p.amount}</p>
                                        <p><strong>Method:</strong> {p.payment_method}</p>
                                        <p><strong>Type:</strong> {p.payment_type}</p>
                                        <p>
                                            <strong>Status:</strong>
                                            <Button
                                                variant="link"
                                                onClick={() => openStatusModal(p.id, p.status)}
                                                className="p-0 ps-1" // added ps-1 for spacing
                                            >
                                                {p.status}
                                            </Button>
                                        </p>
                                        <p><strong>Reference ID:</strong> {p.reference_id}</p>
                                        <p><strong>Transaction ID:</strong> {p.transaction_id}</p>
                                        <p><strong>Created At:</strong> {new Date(p.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No payments found.</p>
                        )}
                    </div>
                </>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Payment Status</DialogTitle>
                        <DialogDescription>
                            Select the new status for payment ID {selectedPaymentId}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Select
                            onValueChange={(value) => setNewStatus(value)}
                            value={newStatus}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Failed">Failed</SelectItem>
                                <SelectItem value="Refunded">Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsModalOpen(false);
                                setNewStatus('');
                            }}
                            className="btn-secondary" // added for consistent look
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleStatusChange}
                            disabled={!newStatus}
                            className="btn-primary" // added for consistent look
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ViewPayments;
