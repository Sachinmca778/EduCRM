'use client';

import { useState , useEffect} from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

export default function NewMemberPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelation: '',
    
    // Membership
    membershipType: '',
    startDate: '',
    duration: '',
    amount: '',
    
    // Health Information
    medicalConditions: '',
    allergies: '',
    fitnessGoals: ''
  });

  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [membershipPlans, setMembershipPlans] = useState<any[]>([]);


  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Calculate the date 15 days before the current date
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 15);

    const formattedDate = pastDate.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email && !formData.phone) newErrors.email = 'Either email or phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!formData.membershipType) newErrors.membershipType = 'Membership type is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      fetch(`${API_BASE_URL}/gym/membership_plans/active`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+ token
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const res = await fetch(`${API_BASE_URL}/gym/members/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':'Bearer '+ token
          // "Authorization": "Bearer " + token // agar JWT laga hai to
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setMessage(`Member created successfully. Code: ${data.memberCode}`);
    } catch (error) {
      console.error(error);
      setMessage("Error creating member");
    }
  };

  const calculateEndDate = () => {
    if (formData.startDate && formData.duration) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setMonth(end.getMonth() + parseInt(formData.duration));
      return end.toISOString().split('T')[0];
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/gym-crm/members"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Members
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Member</h1>
          <p className="mt-2 text-muted-foreground">Register a new gym member with complete information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.firstName ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.lastName ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-border'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.email ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                onFocus={(e) => e.target.showPicker()}
                max="2005-12-31"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium text-foreground">Address Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.address ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  placeholder="Enter state"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium text-foreground">Emergency Contact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Emergency Contact Name *
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.emergencyContactName ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter emergency contact name"
              />
              {errors.emergencyContactName && (
                <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Emergency Contact Phone *
              </label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.emergencyContactPhone ? 'border-red-500' : 'border-border'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.emergencyContactPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Relationship
              </label>
              <input
                type="text"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="e.g., Spouse, Parent, Friend"
              />
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCard className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium text-foreground">Membership Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Membership Type *
              </label>
              <select
                name="membershipType"
                value={formData.membershipType}
                onChange={(e) => {
                  handleInputChange(e);
                  const selectedPlan = membershipPlans.find(
                    (plan) => plan.name === e.target.value
                  );
                  if (selectedPlan) {
                    setFormData((prev) => ({
                      ...prev,
                      duration: selectedPlan.durationMonths.toString(),
                      amount: selectedPlan.price.toString()
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
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                onFocus={(e) => e.target.showPicker()}
                min={minDate}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.startDate ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
              )}
            </div>
            
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Duration (months)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  readOnly
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                  />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors ${
                  errors.amount ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>
          </div>
          
          {formData.startDate && formData.duration && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-primary">
                <strong>Membership End Date:</strong> {calculateEndDate()}
              </p>
            </div>
          )}
        </div>

        {/* Health Information */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium text-foreground">Health Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Medical Conditions
              </label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="Any medical conditions we should be aware of?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="Any allergies or dietary restrictions?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fitness Goals
              </label>
              <textarea
                name="fitnessGoals"
                value={formData.fitnessGoals}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="What are your fitness goals?"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/gym-crm/members"
            className="px-6 py-2 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-accent transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Member
          </button>
        </div>
      </form>
    </div>
  );
}
