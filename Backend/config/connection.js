import mongoose from 'mongoose';

const { connect, connection } = mongoose;

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/Elementum';

    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
