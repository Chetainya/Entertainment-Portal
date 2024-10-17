import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Store/authSlice';
import Button from './Button';
import CustomLink from './CustomLink';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password,
      } , {
        withCredentials : true
      });

      // On success, store token in localStorage and redirect to dashboard
      dispatch(login(response.data));
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        // Invalid credentials
        setErrorMessage(error.response.data.errors[0].msg);
      } else {
        // Handle other errors
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className='m-4'>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button> */}
        <Button title={isLoading ? 'Logging in...' : 'Login'} disabled={isLoading} />
      </form>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      <p className='m-4'>Register for New User : <CustomLink NavigateTo="/signUp" title="SignUp" /></p>
    </div>
  );
};

export default Login;
