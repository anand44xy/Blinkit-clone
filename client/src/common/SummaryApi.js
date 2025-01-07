export const baseURL = "http://localhost:5000";

const SummaryApi = {
    register: {
        method: 'POST',
        url: '/api/user/register',
    },
    login: {
        method: 'POST',
        url: '/api/user/login',
    },
    forgot_password: {
        method: 'PUT',
        url: '/api/user/forgot-password',
    },
    forgot_password_otp_verification: {
        method: 'PUT',
        url: '/api/user/verify-forgot-password-otp',
    },
};

export default SummaryApi;
