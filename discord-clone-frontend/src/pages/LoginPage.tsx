import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-300">Login to Discord</h2>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-bold mb-1 text-gray-300">
            Email or Username
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-bold mb-1 text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-sm text-purple-400 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Log In
        </button>
        <div className="mt-4 text-center text-sm">
          Need an account?{' '}
          <Link to="/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
