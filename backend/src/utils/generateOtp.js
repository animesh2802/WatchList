const generateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000);
    return otp.toString();
};

export default generateOtp;