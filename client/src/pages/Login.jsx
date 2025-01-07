import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { toast } from 'react-toastify';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate();

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate input fields before form submission
  const validateInputs = () => {
    const errors = {};

    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i.test(data.email)) errors.email = 'Invalid email format';
    if (!data.password.trim()) errors.password = 'Password is required';

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission and login logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Validate inputs before proceeding

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else if (response.data.success) {
        toast.success(response.data.message);
        setData({ email: '', password: '' });
        navigate('/'); // Redirect to Home after login
      }

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      AxiosToastError(error);
    }
  };

  // Check if all fields are filled to enable the submit button
  const isFormValid = Object.values(data).every((el) => el.trim());

  return (
    <section className="flex items-center justify-center min-h-screen w-full container mx-auto px-3">
      <div className="w-full max-w-lg mx-auto my-6 p-8 border rounded-md bg-white shadow-lg">
        <div className="text-center gap-y-3 ">
          <img src="512px-Blinkit-yellow-app-icon.svg.png" alt="Blinkit Logo" className='w-18 h-20 mx-auto' />
          <p className="font-bold text-2xl">India's last minute app</p>
          <p>Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid gap-3 mb-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block font-medium">Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="absolute top-9 right-8 text-gray-500 hover:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded ${isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isFormValid} // Disable button if fields are not filled
          >
            Login
          </button>
        </form>

        <div className='flex justify-between'>
          <p className="pl-4">
            Don’t have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
          </p>
          <p className='pr-4'>
            Forgot ? <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">Password</Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Login;
