const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users(name,email,password,role)
             VALUES($1,$2,$3,'user')
             RETURNING id,name,email,role`,
            [name, email, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: "Signup successful",
            user: result.rows[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};




const login = async (req, res) => {

    const { email, password } = req.body;


    try {


        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );


        if (result.rows.length === 0) {

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }


        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {

            return res.status(401).json({
                success:false,
                message:"Invalid password"
            });

        }


        const token = jwt.sign(
  {
    id: user.id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);

        res.json({

            success:true,

            message:"Login successful",

            token

        });


    } catch(error) {


        console.log(error);


        res.status(500).json({

            success:false,

            message:"Server error"

        });

    }

};



module.exports = {
    signup,
    login
};