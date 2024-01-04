import mongoose from "mongoose";

const connectDB = async () => {
  try {
      const connection = await mongoose.connect(process.env.DATABASE_URI);

      console.log('Connected to Mongo Database 👍🏽')

      return connection;
  } catch (error) {
      console.error(error.message);
      process.exit(1);
  }
}

export default connectDB;
