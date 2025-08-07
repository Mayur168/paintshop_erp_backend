const User = require("../models/user_model")
const bcrypt = require('bcrypt')

// Home page logic
const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("welcome")
    } catch (error) {
        console.log(error)
    }
}

// Register Logic
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already Exists" });
        }

        const userCreated = await User.create({ username, email, phone, password });
        res.status(200).json({
            message: "Data sent Successfully ",
            userCreated: userCreated._id.toString(),
            // userCreated: userCreated,
            token: await userCreated.generateToken(),
        });
    } catch (error) {
        res.status(500).json("internal Server Error");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (isPasswordValid) {
            res.status(200).json({
                message: "Login Successful",
                userid: userExist._id.toString(),
                token: await userExist.generateToken(),
            });
        } else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//to send user data -User logic
// const user = async (req, res) => {
//     try {
//         // res.status(200).json({msg:'Hi user'})
//         const userData = req.user
//         console.log(userData);
//         return res.status(200).json({ msg: userData })

//     } catch (error) {
//         console.log(`error from the route ${error}`);

//     }
// }
const user = async (req, res) => {
    try {
        // Check if req.user exists (populated by authentication middleware)
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized: No user found' });
        }

        // Assuming req.user contains the user data including username
        const userData = req.user;

        // If you need to fetch full user data from the database (e.g., MongoDB with Mongoose)
        // Uncomment the following lines and adjust based on your schema/model
        /*
        const User = require('../models/User'); // Import your User model
        const userData = await User.findById(req.user._id).select('-password'); // Exclude sensitive fields like password
        if (!userData) {
            return res.status(404).json({ msg: 'User not found' });
        }
        */

        // Ensure username is present in the response
        if (!userData.username) {
            console.warn('Username not found in user data');
            // Optionally, handle cases where username is missing
        }

        // Log user data for debugging
        console.log('User Data:', userData);

        // Return the user data in the response
        return res.status(200).json({ 
            msg: 'User data retrieved successfully',
            data: userData 
        });

    } catch (error) {
        // Log the error for debugging
        console.error(`Error in user route: ${error.message}`);

        // Return a generic error response
        return res.status(500).json({ msg: 'Server error, please try again later' });
    }
};
module.exports = { home, register, login, user }