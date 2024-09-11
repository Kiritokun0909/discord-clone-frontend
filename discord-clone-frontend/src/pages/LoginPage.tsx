import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setUser } from '../redux/slices/userSlice';
import { login, LoginData } from '../api/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const loginData: LoginData = {
      username: email, // We're using email field for both email and username
      password: password
    };

    try {
      const result = await login(loginData);
      // Assuming the login function returns user data on success
      dispatch(setUser({
        id: result.id,
        username: result.username,
        email: result.email,
        avatarUrl: result.avatarUrl,
      }));
      navigate('/channels/@me');
    } catch (error) {
      setError('Invalid email/username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-300">Login to Discord</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
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
