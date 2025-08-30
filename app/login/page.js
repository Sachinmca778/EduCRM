"use client";

import { useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 bg-[#1E2A38] mb-8">Welcome to EduCRM</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 ring-blue-300">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 outline-none text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 border px-4 py-2 rounded-lg shadow-sm focus-within:ring-2 ring-blue-300">
            <LockKeyhole size={18} className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 outline-none text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} EduCRM. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
