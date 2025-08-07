const User = require('../models/user_model');
const Contact = require('../models/contact-model');
const Service = require('../models/service-model')
const bcrypt = require('bcrypt')

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "Users not found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Get all contacts
const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        console.log(services);

        if (!services || services.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

// Delete user by ID
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id); // Corrected: removed { _id: id }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};
// get user by ID
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Find user by ID, excluding the password field
        const data = await User.findOne({ _id: id }, { password: 0 });

        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data with a success message
        return res.status(200).json({
            message: "User retrieved successfully",
            data: data
        });
    } catch (error) {
        next(error);
    }
};

// Update user by ID
// const updateUserById = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         // const updateData = req.body;
//         const data= await User.findOne({ _id: id }, { password: 0 })
//         return res.status(200).json({data});
//     } catch (error) {
//         next(error);
//     }
// };

// const updateUserById = async (req, res, next) => {
//     try {
//         console.log('updateUserById called with ID:', req.params.id);
//         console.log('Request body:', req.body);
//         const id = req.params.id;
//         const updateData = req.body;

//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         if (updateData.password) {
//             delete updateData.password;
//         }

//         const updatedUser = await User.updateOne(
//             { _id: id },
//             { $set: updateData },
//             // { new: true, runValidators: true, select: '-password' }
//         );

//         if (!updatedUser) {
//             console.log('User not found for ID:', id);
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json({
//             message: "User updated successfully",
//             data: updatedUser
//         });
//     } catch (error) {
//         console.error('Error in updateUserById:', error);
//         next(error);
//     }

// };
const updateUserById = async (req, res, next) => {
    try {
        console.log('updateUserById called with ID:', req.params.id);
        console.log('Request body:', req.body);
        const id = req.params.id;
        const updateData = req.body;

        // Validate ObjectId
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     console.log('Invalid user ID format:', id);
        //     return res.status(400).json({ message: "Invalid user ID format" });
        // }

        // Handle password update if provided
        if (updateData.password) {
            // Hash the password with bcrypt (10 is the salt rounds)
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
            console.log('Password hashed successfully');
        }

        // Update the user
        const updateResult = await User.updateOne(
            { _id: id },
            { $set: updateData },
            { runValidators: true } // Ensure schema validators run
        );

        // Check if user was found and updated
        if (updateResult.matchedCount === 0) {
            console.log('User not found for ID:', id);
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch the updated user (excluding password) to return
        const updatedUser = await User.findById(id, { password: 0 });

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error('Error in updateUserById:', error);
        next(error);
    }
};
module.exports = { getAllUsers, getAllContacts, deleteUserById, updateUserById, getUserById,getAllServices };