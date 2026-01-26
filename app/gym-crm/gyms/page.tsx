'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Phone, Mail } from 'lucide-react';

interface Gym {
  id: number;
  gymCode: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function GymsPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/gym/gyms/active`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      if (!response.ok) throw new Error('Failed to fetch gyms');

      const data = await response.json();
      setGyms(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching gyms:', err);
      setError('Failed to load gyms');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this gym?')) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/gym/gyms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.ok) {
        setGyms(gyms.filter(gym => gym.id !== id));
        alert('Gym deleted successfully');
      } else {
        alert('Failed to delete gym');
      }
    } catch (err) {
      console.error('Error deleting gym:', err);
      alert('An error occurred while deleting the gym');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-foreground">Gyms</h1>
        </div>
        <div className="text-center py-8">Loading gyms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-foreground">Gyms</h1>
        </div>
        <div className="text-center py-8 text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/gym-crm" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gyms</h1>
            <p className="mt-1 text-muted-foreground">Manage your gym locations</p>
          </div>
        </div>

        <Link
          href="/gym-crm/gyms/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Gym
        </Link>
      </div>

      {/* Gyms Grid */}
      {gyms.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No gyms found</div>
          <Link
            href="/gym-crm/gyms/create"
            className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Gym
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <div key={gym.id} className="bg-card rounded-2xl border border-border p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{gym.name}</h3>
                  <p className="text-sm text-muted-foreground">Code: {gym.gymCode}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    gym.isActive !== false
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {gym.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {gym.email && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {gym.email}
                  </div>
                )}
                {gym.phone && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {gym.phone}
                  </div>
                )}
                {(gym.city || gym.state) && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {[gym.city, gym.state].filter(Boolean).join(', ')}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <Link
                  href={`/gym-crm/gyms/${gym.id}/edit`}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary hover:bg-primary/10 rounded-md"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(gym.id)}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}