'use client';

import { useState } from "react";
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateGym() {
  const [formData, setFormData] = useState({
    gymCode: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/gym/gyms/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Gym created successfully!");
        // Redirect to gyms list
        window.location.href = '/gym-crm/gyms';
      } else {
        const errorData = await response.json();
        alert("Failed to create gym: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the gym.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/gym-crm/gyms" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Gyms
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Create Gym</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl border border-border p-6 shadow-md max-w-2xl">
        {/* Gym Code */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Gym Code *</label>
          <input
            type="text"
            name="gymCode"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter unique gym code"
            value={formData.gymCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Gym Name *</label>
          <input
            type="text"
            name="name"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter gym name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
          <textarea
            name="address"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter full address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">City</label>
          <input
            type="text"
            name="city"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">State</label>
          <input
            type="text"
            name="state"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Pincode</label>
          <input
            type="text"
            name="pincode"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Is Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            className="mr-2"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label className="text-sm font-medium text-foreground">Is Active</label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark"
          >
            <Save className="h-4 w-4 mr-2" />
            Create Gym
          </button>
        </div>
      </form>
    </div>
  );
}
