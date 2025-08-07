const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const URI = process.env.MONGODB_URL;

if (!URI) {
  throw new Error('MONGODB_URL is not defined in .env');
}
// mongoose.connect(URI)

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connected succesfullys");

    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}

module.exports = connectDB 