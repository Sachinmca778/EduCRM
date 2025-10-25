'use client';

import { useState , useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:8080/gym/members/all',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch members');
        return res.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // const members = [
  //   {
  //     id: 1,
  //     name: 'Rahul Sharma',
  //     email: 'rahul.sharma@email.com',
  //     phone: '+91 98765 43210',
  //     address: 'Mumbai, Maharashtra',
  //     emergencyContact: '+91 98765 43211',
  //     membershipType: 'Premium',
  //     status: 'active',
  //     joinDate: '2024-01-15',
  //     expiryDate: '2025-01-15',
  //     lastVisit: '2024-12-20',
  //     dues: 0
  //   },
  //   {
  //     id: 2,
  //     name: 'Priya Patel',
  //     email: 'priya.patel@email.com',
  //     phone: '+91 98765 43212',
  //     address: 'Delhi, NCR',
  //     emergencyContact: '+91 98765 43213',
  //     membershipType: 'Basic',
  //     status: 'active',
  //     joinDate: '2024-02-01',
  //     expiryDate: '2025-02-01',
  //     lastVisit: '2024-12-19',
  //     dues: 1500
  //   },
  //   {
  //     id: 3,
  //     name: 'Amit Kumar',
  //     email: 'amit.kumar@email.com',
  //     phone: '+91 98765 43214',
  //     address: 'Bangalore, Karnataka',
  //     emergencyContact: '+91 98765 43215',
  //     membershipType: 'Premium',
  //     status: 'expired',
  //     joinDate: '2023-12-01',
  //     expiryDate: '2024-12-01',
  //     lastVisit: '2024-11-28',
  //     dues: 3000
  //   }
  // ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone?.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || member.status?.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredMembers.length / recordsPerPage); // Calculate total pages
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex); // Slice members for the current page

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Basic': return 'bg-primary/10 text-primary';
      case 'Standard': return 'bg-orange-100 text-orange-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Members</h1>
          <p className="mt-2 text-muted-foreground">Manage your gym members and their information</p>
        </div>
        <Link
          href="/gym-crm/members/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members by name, email, or phone..."
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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
            <button className="inline-flex items-center px-3 py-2 border border-border rounded-lg text-sm font-medium text-foreground bg-background hover:bg-accent transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-foreground">
            {paginatedMembers.length} Members
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
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {paginatedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground font-medium text-sm">
                            {member.firstName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">{member.firstName + ' ' + member.lastName}</div>
                        <div className="text-sm text-muted-foreground">ID: {member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{member.phone}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipTypeColor(member.membershipType || '')}`}>
                      {member.membershipType || ''}
                    </span>
                    <div className="text-sm text-muted-foreground mt-1">
                      Expires: {member.expiryDate || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1) || ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {member.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.dues > 0 ? (
                      <div className="flex items-center text-red-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">₹{member.dues}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-green-600 font-medium">No Dues</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/gym-crm/members/${member.id}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/gym-crm/members/${member.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        Edit
                      </Link>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
