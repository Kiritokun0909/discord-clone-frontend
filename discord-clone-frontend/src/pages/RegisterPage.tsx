import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/toast';
import {RegisterData, register } from '../api/auth'; // Assuming the register function is exported from auth.ts

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast({ type: 'error', title: 'Registration Failed', context: 'Passwords do not match.' });
      return;
    }

    try {
      const dataRequest : RegisterData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }
      const response = await register(dataRequest);
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.data.description);
      }

      showToast({ type: 'success', title: 'Registration Successful', context: 'You can now log in.' });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      showToast({ type: 'error', title: 'Registration Failed', context: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-300">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-bold mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </form>
        <p className="mt-4 text-[11px] text-gray-200">
          By registering, you agree to Discord's{' '}
          <Link to="/terms" className="text-blue-400 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-blue-400 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default RegisterPage;
