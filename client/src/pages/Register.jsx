import React, { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { toast } from 'react-toastify';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const errors = {};

    // Name Validation
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Enter a valid email';
    }

    // Password Validation
    if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      // toast.error(
      //   "Password must be at least 6 characters long"
      // )
      // return
    }

    // Confirm Password Validation
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateInputs()) return; // Validate inputs before proceeding

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      });

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate('/login')
      }
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      AxiosToastError(error)
    }
  };

  // Check if all fields are filled
  const valideValue = Object.values(data).every((el) => el.trim());

  return (
    <section className="flex items-center justify-center min-h-screen w-full container mx-auto px-3">
      <div className="w-full max-w-lg mx-auto my-6 p-8 border rounded-md bg-white shadow-lg">
        <div className="text-center gap-2 mb-4">
          <img src="512px-Blinkit-yellow-app-icon.svg.png" alt="Blinkit Logo" className='w-18 h-20 mx-auto' />
          <p className="font-bold text-2xl">India's last minute app</p>
          <p>Log in or Sign up</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid gap-3 mb-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={data.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block font-medium">Confirm Password:</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="absolute top-9 right-8 text-gray-500 hover:text-black"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded ${valideValue ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            disabled={!valideValue} // Disable button if fields are not filled
          >
            Register
          </button>
        </form>

        <p className='pl-6'>
          Already have account ? <Link to={"/login"} className='text-blue-600 hover:text-blue-800' >Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
