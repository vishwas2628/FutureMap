import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { FutureContext } from '../context/FutureContext.jsx';
import { toast } from 'react-toastify';

const SignUp = () => {
  const { backendUrl, navigate } = useContext(FutureContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    education: '',
    currentfield: '',
    interests: '',
    experience: '',
    firstname: '',
    lastname: '',
    country: 'United States',
    streetaddress: '',
  });

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
    const { email, password, ...profileData } = formData;

    // Ensure the profileData is nested under "profile"
    const payload = {
      email,
      password,
      profile: {
        educationLevel: profileData.education,
        currentField: profileData.currentfield,
        interestField: profileData.interests,
        pastExperience:profileData.experience,
        firstName: profileData.firstname,
        lastName: profileData.lastname,
        country: profileData.country,
        streetAddress: profileData.streetaddress, // Optional depending on backend schema
      },
    };

    const signupResponse = await axios.post(`${backendUrl}/api/user/signup`, payload);

    if (signupResponse.data.success) {
      toast.success('Sign-up successful!');
      navigate('/dashboard');
    } else {
      toast.error(signupResponse.data.message || 'Sign-up failed.');
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
    <form
      className="flex flex-col h-screen bg-[#212121] p-4 items-center justify-center"
      onSubmit={onSubmitHandler}
    >
      <div className="w-full max-w-4xl space-y-6 p-6">
        <h2 className="text-lg font-semibold text-white text-center border-b border-white/10 pb-4">
          Sign Up and Complete Your Profile
        </h2>

        {/* Sign Up Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-white"
            >
              Education Level
            </label>
            <input
              type="text"
              name="education"
              id="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="currentfield"
              className="block text-sm font-medium text-white"
            >
              Current Field
            </label>
            <input
              type="text"
              name="currentfield"
              id="currentfield"
              value={formData.currentfield}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-white"
            >
              Interest Field
            </label>
            <input
              type="text"
              name="interests"
              id="interests"
              value={formData.interests}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-white"
            >
              Past Experience
            </label>
            <textarea
              name="experience"
              id="experience"
              rows={3}
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              placeholder="Write a few sentences about yourself."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-white"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
            >
              <option>United States</option>
              <option>India</option>
              <option>Japan</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="streetaddress"
              className="block text-sm font-medium text-white"
            >
              Street Address
            </label>
            <input
              type="text"
              name="streetaddress"
              id="streetaddress"
              value={formData.streetaddress}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 bg-[#333333] text-white rounded focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 mt-6 border-t border-white/10 pt-4">
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;