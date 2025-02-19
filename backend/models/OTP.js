const mongoose  = require('mongoose');
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    otp:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 10*60,
    }
})


//function to send mails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification email from WatchList", otp);
        console.log("Mail sent successfully: ", mailResponse);
    }
    catch(error){
        console.log("Error occured while sending mail: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})




module.exports = mongoose.model('OTP', OTPSchema); 