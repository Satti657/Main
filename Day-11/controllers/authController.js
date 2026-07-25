const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    login
};