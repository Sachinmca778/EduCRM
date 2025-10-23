'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Save, User, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewPaymentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    memberId: '',
    memberName: '',
    amount: '',
    paymentMethod: 'UPI',
    membershipType: 'Basic',
    date: '',
    status: 'completed',
    transactionId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New payment:', formData);
    // Simulate save
    alert('Payment recorded successfully!');
    router.push('/gym-crm/payments');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Record Payment</h1>
          <p className="mt-2 text-muted-foreground">Add a new payment record for a gym member</p>
        </div>
        <Link
          href="/gym-crm/payments"
          className="inline-flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Payments
        </Link>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Member Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" /> Member Name
            </label>
            <input
              type="text"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="e.g., Rahul Sharma"
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Member ID */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" /> Member ID
            </label>
            <input
              type="text"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              placeholder="e.g., M001"
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Membership Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Membership Type</label>
            <select
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            >
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" /> Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" /> Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" /> Payment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Transaction ID */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Transaction ID (optional)</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              placeholder="e.g., TXN123456789"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" /> Payment Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Payment
          </button>
        </div>
      </form>
    </div>
  );
}
