'use client';

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Save, User, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewPaymentPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [membershipPlans, setMembershipPlans] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    memberId: '',
    memberCode: '',
    memberName: '',
    amount: '',
    paymentMethod: 'UPI',
    membershipType: '',
    membershipId: '',
    date: '',
    status: 'completed',
    transactionId: '',
  });

  useEffect(() => {
    // Calculate the date 15 days before the current date
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 15);
    currentDate.setDate(currentDate.getDate());

    const minDateFormat = pastDate.toISOString().split('T')[0];
    const maxDateFormat = currentDate.toISOString().split('T')[0];
    setMinDate(minDateFormat);
    setMaxDate(maxDateFormat);
  }, []);


  useEffect(() => {
      fetch('http://localhost:8080/gym/membership_plans/active',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+localStorage.getItem('accessToken')
        }
      })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch membership plans');
        return res.json();
      })
      .then((data) => {
        setMembershipPlans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    const searchTerm = formData.memberName.trim();

    if (!searchTerm) {
      setMembers([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
        setLoading(true);
        fetch(`http://localhost:8080/gym/members/search?searchTerm=${searchTerm}&page=0&size=10`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.getItem('accessToken')
          }
        })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch members");
          return res.json();
        })
        .then((data) => {
          setMembers(data.content || []);
          setError(null);
          setShowDropdown(true);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [formData.memberName]);


  const handleSelectMember = (member) => {
    setFormData({
      ...formData,
      memberName: `${member.firstName} ${member.lastName}`,
      memberCode: member.memberCode,
      memberId: member.id.toString(),
      membershipType: member.membershipType || '',

    });
    setShowDropdown(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/gym/payments/create_record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':'Bearer '+localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          ...formData,
          memberId: Number(formData.memberId) ,
          status : formData.status.toUpperCase()
        })
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      alert(`Payment recorded successfully! ${data.memberName}`);

      setMessage(`Member created successfully. Code: ${data.memberName}`);
    } catch (error) {
      console.error(error);
      setMessage("Error creating member");
    }
    // Simulate save
    alert('Payment recorded successfully!');
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
              autoComplete="off"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />

          {/* Dropdown */}
          {showDropdown && members.length > 0 && (
            <ul
              className="absolute z-20 bg-white border border-gray-200 rounded-xl mt-1 max-h-60 overflow-auto shadow-lg w-full"
              style={{ backdropFilter: "blur(6px)", width: "520px"}}
            >
              {members.map((member) => (
                <li
                  key={member.id}
                  className="px-4 py-3 cursor-pointer transition-colors border-b last:border-b-0 border-gray-100
                            hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
                  onClick={() => handleSelectMember(member)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {member.firstName} {member.lastName}{" "}
                      <span className="text-gray-500 text-xs">({member.memberCode})</span>
                    </span>
                    {member.phone && (
                      <span className="text-xs text-gray-500 mt-0.5">
                        📞 {member.phone}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          </div>

          {/* Member ID */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" /> Member ID
            </label>
            <input
              type="text"
              name="memberCode"
              value={formData.memberCode}
              onChange={handleChange}
              placeholder="e.g., M001"
              readOnly
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>

          {/* Membership Type */}
          <div>
          <label className="block text-sm font-medium text-foreground mb-2">
                Membership Type *
              </label>
              <select
                name="membershipType"
                value={formData.membershipType}
                onChange={(e) => {
                  handleChange(e);
                  const selectedPlan = membershipPlans.find(
                    (plan) => plan.name === e.target.value
                  );
                  if (selectedPlan) {
                    setFormData((prev) => ({
                      ...prev,
                      duration: selectedPlan.durationMonths.toString(),
                      amount: selectedPlan.price.toString(),
                      membershipId: selectedPlan.id,
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, duration: '', amount: '' }) );
                  }
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.membershipType ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Select membership type</option>
                  {membershipPlans.map((plan) => {
                    const monthlyPrice = Math.round(plan.price / plan.durationMonths);
                    return (
                      <option key={plan.id} value={plan.name}>
                        {plan.name} (₹{monthlyPrice}/month)
                      </option>
                    );
                  })}
              </select>
              {errors.membershipType && (
                <p className="mt-1 text-sm text-red-600">{errors.membershipType}</p>
              )}
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
              onFocus={(e) => e.target.showPicker()}
              min={minDate}
              max={maxDate}
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
