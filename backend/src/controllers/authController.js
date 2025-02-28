import { createUser, getUserByEmail } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {

    // Check if user already exists
    // Create new user
    
    try {

        const {email, username, password} = req.body;

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({error: "Email already registered"});
        }

        const user = await createUser(email, username, password);
        res.status(201).json({message: " User registered successfully!",user});
        
    } catch (err) {
        return res.status(500).json({error: err.message});
        
    }

};

export const login = async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await getUserByEmail(email);

        if(!user){
            return res.status(400).json({error: "There isn't a matching account with this email"});
        }

        const isMatch = bcrypt.compare(password,user.password_hash);
        if(!isMatch){
            return res.status(400).json({error: "Invalid Password"});
        }

        const token = jwt.sign({ id: user.id, email: user.email},process.env.JWT_SECRET,{expiresIn: "1h"});
        res.json({message: "Login successful!", token })
        
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
    // Verify user exist
    

    // Validate password

    // generate JWT Toekn

};
