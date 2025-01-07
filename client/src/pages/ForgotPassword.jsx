import React, { useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { toast } from 'react-toastify';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
  const [data, setData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
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
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i.test(data.email)) errors.email = 'Invalid email format';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else if (response.data.success) {
        toast.success(response.data.message);
        setData({ email: '' });
        navigate('/otp-verification', {
          state: { email: data.email }, // Pass email to the next page
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const isFormValid = Object.values(data).every((el) => el.trim());

  return (
    <section className="flex items-center justify-center min-h-screen w-full container mx-auto px-3">
      <div className="w-full max-w-lg mx-auto my-6 p-8 border rounded-md bg-white shadow-lg">
        <div className="text-center gap-y-3">
          <img src="512px-Blinkit-yellow-app-icon.svg.png" alt="Blinkit Logo" className="w-18 h-20 mx-auto" />
          <p className="font-bold text-2xl">India's last minute app</p>
          <p>Reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid gap-3 mb-4">
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
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded ${isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
