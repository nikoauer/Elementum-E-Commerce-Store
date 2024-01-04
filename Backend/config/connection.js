import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Connected to Mongo Database 👍🏽')
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}