import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { FutureContext } from '../context/FutureContext.jsx';
import assets from '../assets/assets.js';
import { toast } from 'react-toastify';

const Login = () => {
  const { token, setToken, navigate, backendUrl, setUserId } = useContext(FutureContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const payload = { email, password };
      const response = await axios.post(`${backendUrl}/api/user/login`, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        // Fetch user ID after login
        // const userResponse = await axios.get(`${backendUrl}/api/user/me`, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer '+ response.data.token,
        //   },
        // });

        // if (userResponse.data.success) {
        //   setUserId(userResponse.data.user._id);
        //   localStorage.setItem('userId', userResponse.data.user._id);
        // }

        toast.success(response.data.message || 'Logged in successfully!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

   useEffect(()=>{
    if (token) {
      navigate('/')      
    }

  },[token])

  return (
    <div className="flex h-screen bg-[#212121]">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-[#212121] text-white p-8">
        <h1 className="text-2xl font-semibold mb-2">
          Log in to <span className="text-blue-500">FutureMap</span>
        </h1>
        <p className="text-sm mb-8">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="cursor-pointer text-blue-400"
          >
            Create Account
          </span>
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email-id
            </label>
            <input
              name="email"
              value={email}
              onChange={handleInputChange}
              type="email"
              id="email"
              className="w-full p-3 bg-[#333333] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              id="password"
              className="w-full p-3 bg-[#333333] text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition"
          >
            Sign in
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div
        className="hidden sm:block sm:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.login_background_dark})`,
        }}
      ></div>
    </div>
  );
};

export default Login;