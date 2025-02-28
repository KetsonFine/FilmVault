import pool from "../config/db.js";
import bcrypt from "bcrypt";



export const createUser = async (email, username, password) =>{
    // Need to hash the password 
    // Create the query for the db
    // Assign parameter values to a single const
    // Result variable that awaits from db
    //return results

    const hashedPassword = await bcrypt.hash(password,10);

    const query = `INSERT INTO users (email , username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username;`;

    const values = [email,username,hashedPassword];
    const results = await pool.query(query,values);

     

};

export const getUserByEmail = async (email) =>{

    const query = "SELECT * FROM users WHERE email = $1";
    const results = await pool.query(query,[email]);
    return results.row[0];

};