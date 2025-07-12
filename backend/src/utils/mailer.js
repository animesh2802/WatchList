import dotenv from 'dotenv';
dotenv.config();

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (toEmail, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'no-reply@resend.dev',
            to: toEmail,
            subject: 'Your WatchList OTP',
            html: `<p>Your OTP for logging into WatchList is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
        });
        if (error) {
            console.log('Resend email error: ', error);
        }
        else {
            console.log('Email sent via Resend: ', data.id);
        }
    }
    catch (err) {
        console.log('Mailer failed: ', err);
    }
}