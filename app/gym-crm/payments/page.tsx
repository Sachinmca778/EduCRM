'use client';

import { useState , useEffect } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Send,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

export default function PaymentsPage() {
  const [paymentSummary, setPaymentSummary] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');


  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    fetch(`http://localhost:8080/gym/payments/summary?date=${today}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Payment Summary');
        return res.json();
      })
      .then((data) => {
        setPaymentSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    
    fetch(`http://localhost:8080/gym/payments/all_payments`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch All Payments');
        return res.json();
      })
      .then((data) => {
        const normalizedData = Array.isArray(data)
        ? data.map((member) => ({
            ...member,
            status: member.status ? member.status.toLowerCase() : 'unknown',
          }))
        : [];

        setPayments(normalizedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // const payments = [
  //   {
  //     id: 1,
  //     memberId: 'M001',
  //     memberName: 'Rahul Sharma',
  //     amount: 2499,
  //     paymentMethod: 'UPI',
  //     status: 'completed',
  //     date: '2024-12-20',
  //     dueDate: '2024-12-25',
  //     membershipType: 'Premium',
  //     transactionId: 'TXN123456789',
  //     reminderSent: false
  //   },
  //   {
  //     id: 2,
  //     memberId: 'M002',
  //     memberName: 'Priya Patel',
  //     amount: 1499,
  //     paymentMethod: 'Cash',
  //     status: 'pending',
  //     date: null,
  //     dueDate: '2024-12-22',
  //     membershipType: 'Standard',
  //     transactionId: null,
  //     reminderSent: true
  //   },
  //   {
  //     id: 3,
  //     memberId: 'M003',
  //     memberName: 'Amit Kumar',
  //     amount: 999,
  //     paymentMethod: 'Card',
  //     status: 'overdue',
  //     date: null,
  //     dueDate: '2024-12-18',
  //     membershipType: 'Basic',
  //     transactionId: null,
  //     reminderSent: true
  //   }
  // ];

  const filteredPayments = payments.filter((payment) => {
    const term = searchTerm.trim().toLowerCase();

    const memberName = payment.memberName?.toLowerCase() || '';
    const memberId = String(payment.memberId || '').toLowerCase();
  
    const matchesSearch = term === '' || memberName.includes(term) || memberId.includes(term);
  
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
  
    const matchesMethod = selectedPaymentMethod === 'all' || payment.paymentMethod === selectedPaymentMethod;
  
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'UPI': return 'bg-purple-100 text-purple-800';
      case 'Cash': return 'bg-green-100 text-green-800';
      case 'Card': return 'bg-primary/10 text-primary';
      case 'Online': return 'bg-orange-100 text-orange-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="mt-2 text-muted-foreground">Manage gym membership payments and fee collection</p>
        </div>
        <Link
          href="/gym-crm/payments/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Link>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold text-foreground">₹{paymentSummary.currentMonthAmount ?? 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-semibold text-foreground">₹{paymentSummary.pendingAmount ?? 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
              <p className="text-2xl font-semibold text-foreground">₹{paymentSummary.totalOverdueAmount ?? 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-semibold text-foreground">₹{paymentSummary.todayRevenue ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Send className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">Send Reminders</span>
            <span className="text-xs text-muted-foreground">WhatsApp, Email, SMS</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <Download className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Generate Receipts</span>
            <span className="text-xs text-muted-foreground">PDF Downloads</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Overdue Report</span>
            <span className="text-xs text-muted-foreground">View all pending</span>
          </button>
          
          <button className="flex flex-col items-center p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all duration-200">
            <DollarSign className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-foreground">Bulk Collection</span>
            <span className="text-xs text-muted-foreground">Multiple payments</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search payments by member name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground transition-colors"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground transition-colors"
            >
              <option value="all">All Methods</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-accent transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">
            {filteredPayments.length} Payments
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-xs font-medium">
                            {payment.memberName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{payment.memberName}</div>
                        <div className="text-sm text-muted-foreground">{payment.memberId} • {payment.membershipType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">₹{payment.amount.toLocaleString()}</div>
                    {payment.transactionId && (
                      <div className="text-xs text-muted-foreground">TXN: {payment.transactionId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(payment.paymentMethod)}`}>
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{payment.dueDate}</div>
                    {payment.status === 'overdue' && (
                      <div className="text-xs text-red-600 font-medium">
                        {Math.ceil((new Date().getTime() - new Date(payment.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {payment.status === 'completed' && (
                        <button className="text-green-600 hover:text-green-800 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      {payment.status === 'pending' && (
                        <button className="text-primary hover:text-primary/80 transition-colors">
                          Mark Paid
                        </button>
                      )}
                      {payment.status === 'overdue' && (
                        <div className="flex space-x-1">
                          <button className="text-orange-600 hover:text-orange-800 transition-colors" title="Send WhatsApp">
                            <Phone className="h-4 w-4" />
                          </button>
                          <button className="text-primary hover:text-primary/80 transition-colors" title="Send Email">
                            <Mail className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800 transition-colors" title="Send SMS">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Reminders */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">Payment Reminders</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">15 payments due in next 7 days</p>
                  <p className="text-sm text-yellow-600">Total amount: ₹22,450</p>
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 transition-colors">
                <Send className="h-4 w-4 mr-2" />
                Send Reminders
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-red-800">8 payments overdue</p>
                  <p className="text-sm text-red-600">Total amount: ₹12,800</p>
                </div>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors">
                <Send className="h-4 w-4 mr-2" />
                Send Urgent Reminders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
