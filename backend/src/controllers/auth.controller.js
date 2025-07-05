import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import generateOtp from "../utils/generateOtp.js";
import { sendOtpEmail } from '../utils/mailer.js';

export const loginController = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required for login!' });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000 //10 minutes
    const hashedOtp = await bcrypt.hash(otp, 10);

    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ email, otp: hashedOtp, otpExpiry });
    }
    else {
        user.otp = hashedOtp;
        user.otpExpiry = otpExpiry;
    }

    await user.save();

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });

};

//verify otp controller
export const verifyOtpController = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    const isOtpExpired = user.otpExpiry < Date.now();

    if (!isOtpValid || isOtpExpired) {
        return res.status(400).json({ message: 'Invalid OTP' })
    }
    if (isOtpExpired) {
        return res.status(400).json({ message: 'Expired OTP' })
    }

    //otp verified - generate jwt
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '1d' }
    );

    // Optionally clear OTP fields after use
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ token });
}