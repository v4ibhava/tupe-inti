// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF9F7] pt-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-[#2B1E16] mb-6">Admin Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email" placeholder="Email Address" required
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-[#C6A15B]"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="Password" required
            className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:border-[#C6A15B]"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit" disabled={loading}
            className="w-full bg-[#2B1E16] text-white py-3 rounded-lg hover:bg-[#C6A15B] transition font-semibold"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-4">
          Default: email: admin@test.com | password: 123456 
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;