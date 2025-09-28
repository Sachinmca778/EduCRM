'use client';

import { useState } from "react";

export default function CreateMembershipPlan() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration_months: "",
    price: "",
    features: "",
    is_active: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/gym/membership_plans/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          features: JSON.parse(formData.features || "[]"), // Parse features as JSON
        }),
      });

      if (response.ok) {
        alert("Membership plan created successfully!");
      } else {
        alert("Failed to create membership plan.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the membership plan.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-foreground">Create Membership Plan</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl border border-border p-6 shadow-md">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
          <input
            type="text"
            name="name"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter the name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            name="description"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter plan description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Duration (Months) */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Duration (Months) *</label>
          <input
            type="number"
            name="duration_months"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter duration in months"
            value={formData.duration_months}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Price *</label>
          <input
            type="number"
            step="0.01"
            name="price"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Features (JSON Format)</label>
          <textarea
            name="features"
            className="block w-full rounded-md border border-border p-2 text-sm"
            placeholder='Enter features as JSON, e.g., ["Feature 1", "Feature 2"]'
            value={formData.features}
            onChange={handleChange}
          />
        </div>

        {/* Is Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            className="mr-2"
            checked={formData.is_active}
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
            Create Plan
          </button>
        </div>
      </form>
    </div>
  );
}