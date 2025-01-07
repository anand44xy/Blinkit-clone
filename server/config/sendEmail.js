import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_API) {
    throw new Error('Provide RESEND_API inside the .env file');
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const response = await resend.emails.send({
            from: 'Blinkit <onboarding@resend.dev>',
            to: sendTo,
            subject,
            html,
        });
        return response;
    } catch (error) {
        console.error('Email Sending Error:', error);
        return null;
    }
};

export default sendEmail;
