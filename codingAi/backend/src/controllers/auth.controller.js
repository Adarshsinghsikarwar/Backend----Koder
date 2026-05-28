import userModel from "../models/user.model.js";
import {sendEmail} from "../services/mail.service.js";


export async function register(req, res) {
    const {username, email , password} = req.body;
    
    const isUserAlreadyExist = await userModel.findOne({ $or: [{ email }, { username }] });
    if (isUserAlreadyExist) {
        return res.status(400).json({
             message: "User already exists",
             success: false,
            err : "User already exists"});
    }

    const user = new userModel({ username, email, password });
    await user.save();

    sendEmail({
        to: email,
        subject: "Welcome to Coding AI!",
        html: `<h1>Welcome to Coding AI, ${username}!</h1><p>Thank you for registering. We're excited to have you on board!</p>`,
    });

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
}