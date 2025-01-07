import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useLocation, useNavigate } from 'react-router-dom';

function OtpVerification() {
    const [data, setData] = useState({ otp: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location?.state?.email) {
            toast.error('Invalid request. Redirecting to Forgot Password.');
            navigate('/forgot-password');
        } else {
            console.log("Email found in location state:", location?.state?.email);
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateInputs = () => {
        const errors = {};
        if (!data.otp.trim()) {
            errors.otp = 'OTP is required';
        } else if (!/^\d{6}$/.test(data.otp)) {
            errors.otp = 'Invalid OTP format';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const payload = {
            email: location?.state?.email,
            otp: data.otp.trim(),
        };

        console.log("Payload sent to API:", payload);

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.error) {
                toast.error(response.data.message);
            } else if (response.data.success) {
                toast.success(response.data.message);
                setData({ otp: '' });
                navigate('/reset-password', {
                    state: {
                        data: response.data,
                        email: location?.state?.email,
                    },
                });
            }
        } catch (error) {
            console.error("Error during API call:", error);
            AxiosToastError(error);
        }
    };

    const isFormValid = Boolean(data.otp.trim());

    return (
        <section className="flex items-center justify-center min-h-screen w-full container mx-auto px-3">
            <div className="w-full max-w-lg mx-auto my-6 p-8 border rounded-md bg-white shadow-lg">
                <div className="text-center gap-y-3">
                    <img src="512px-Blinkit-yellow-app-icon.svg.png" alt="Blinkit Logo" className="w-18 h-20 mx-auto" />
                    <p className="font-bold text-2xl">India's last minute app</p>
                    <p>Verify your OTP</p>
                </div>

                <form onSubmit={handleSubmit} className="p-5">
                    <div className="grid gap-3 mb-4">
                        <div>
                            <label htmlFor="otp" className="block font-medium">OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter the OTP"
                                value={data.otp}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-2 rounded ${isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!isFormValid}
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </section>
    );
}

export default OtpVerification;
