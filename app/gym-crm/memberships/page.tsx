'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User, Phone, Mail } from 'lucide-react';

interface MembershipPlan {
  id: number;
  name: string;
  description?: string;
  duration_months: number;
  price: number;
  features?: string[];
  is_active?: boolean;
}

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface MemberMembership {
  member_id: number;
  plan_id: number;
  start_date: string;
  end_date: string;
  amount_paid: number;
  auto_renewal?: boolean;
}

export default function MembershipPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<MemberMembership>({
    member_id: 0,
    plan_id: 0,
    start_date: '',
    end_date: '',
    amount_paid: 0,
    auto_renewal: false
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMembers([
      { id: 101, name: 'John Doe', email: 'john@example.com', phone: '9876543210' },
      { id: 102, name: 'Jane Smith', email: 'jane@example.com', phone: '9123456780' },
      { id: 103, name: 'Robert Brown', email: 'robert@example.com', phone: '9988776655' },
      { id: 104, name: 'Vishal Kumar', email: 'vishal@example.com', phone: '9876500000' },
    ]);

    setPlans([
      {
        id: 1,
        name: 'Basic',
        description: 'Basic Gym Plan with 1 personal session',
        duration_months: 1,
        price: 999,
        features: ['Gym access', '1 personal training session'],
        is_active: true
      },
      {
        id: 2,
        name: 'Standard',
        description: 'Standard Plan with group classes & 3 personal sessions',
        duration_months: 3,
        price: 1499,
        features: ['Gym access', '3 personal sessions', 'Group classes'],
        is_active: true
      },
      {
        id: 3,
        name: 'Premium',
        description: 'Premium Plan with unlimited access & diet consultation',
        duration_months: 12,
        price: 2499,
        features: ['Unlimited gym access', 'Monthly personal training', 'Diet consultation'],
        is_active: true
      }
    ]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.member_id) newErrors.member_id = 'Member is required';
    if (!formData.plan_id) newErrors.plan_id = 'Plan is required';
    if (!formData.start_date) newErrors.start_date = 'Start date is required';
    if (!formData.amount_paid) newErrors.amount_paid = 'Amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEndDate = () => {
    const plan = plans.find(p => p.id === formData.plan_id);
    if (plan && formData.start_date) {
      const start = new Date(formData.start_date);
      const end = new Date(start);
      end.setMonth(end.getMonth() + plan.duration_months);
      return end.toISOString().split('T')[0];
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setMessage(`Membership assigned to ${members.find(m => m.id === formData.member_id)?.name}. End date: ${calculateEndDate()}`);
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toString().includes(searchTerm)
  );

  const selectedMember = members.find(m => m.id === formData.member_id);
  const selectedPlan = plans.find(p => p.id === formData.plan_id);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/gym-crm" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Memberships</h1>
          <p className="mt-1 text-muted-foreground">Assign membership plans to members</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl border border-border p-6 shadow-md">
        {/* Member Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Member by ID or Name *</label>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Type ID or name..."
          />
         {searchTerm && filteredMembers.length > 0 && (
            <div className="mt-1 rounded-lg border border-border bg-card shadow-lg max-h-48 overflow-y-auto">
              {filteredMembers.map(m => (
                <div
                  key={m.id}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, member_id: m.id }));
                    setSearchTerm(`${m.id} - ${m.name}`);
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <div className="font-medium">
                    {m.id} - {m.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {m.email} • {m.phone}
                  </div>
                </div>
              ))}
            </div>
          )}
          {errors.member_id && <p className="mt-1 text-sm text-red-600">{errors.member_id}</p>}
        </div>

        {/* Member Card */}
        {selectedMember && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                {selectedMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> {selectedMember.name}
                </h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {selectedMember.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {selectedMember.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Membership Plan *</label>
          <select
            name="plan_id"
            value={formData.plan_id}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${errors.plan_id ? 'border-red-500' : 'border-border'}`}
          >
            <option value="">Select a plan</option>
            {plans.map(plan => (
              <option key={plan.id} value={plan.id}>{plan.name} - ₹{plan.price}</option>
            ))}
          </select>
          {errors.plan_id && <p className="mt-1 text-sm text-red-600">{errors.plan_id}</p>}
        </div>

        {/* Plan Card */}
        {selectedPlan && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl shadow-sm space-y-2">
            <h3 className="font-bold text-lg text-foreground">{selectedPlan.name} - ₹{selectedPlan.price}</h3>
            <p className="text-sm text-gray-600">{selectedPlan.description}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedPlan.features?.map((f, i) => (
                <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{f}</span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">Duration: {selectedPlan.duration_months} months</p>
          </div>
        )}

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Start Date *</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${errors.start_date ? 'border-red-500' : 'border-border'}`}
          />
          {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
        </div>

        {/* Amount Paid */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Amount Paid *</label>
          <input
            type="number"
            name="amount_paid"
            value={formData.amount_paid}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${errors.amount_paid ? 'border-red-500' : 'border-border'}`}
            placeholder="Enter amount"
          />
          {errors.amount_paid && <p className="mt-1 text-sm text-red-600">{errors.amount_paid}</p>}
        </div>

        {/* Auto Renewal */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="auto_renewal"
            checked={formData.auto_renewal}
            onChange={handleInputChange}
            className="w-4 h-4 border border-border rounded"
          />
          <label className="text-sm text-foreground">Enable Auto Renewal</label>
        </div>

        {/* End Date */}
        {formData.start_date && formData.plan_id && (
          <div className="p-3 mt-2 border rounded-lg bg-primary/10 text-primary font-medium">
            End Date: {calculateEndDate()}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-4">
          <Link href="/gym-crm" className="px-6 py-2 border rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center">
            <Save className="h-4 w-4 mr-2" /> Save Membership
          </button>
        </div>

        {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      </form>
    </div>
  );
}
