const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('Error: MONGO_URI environment variable is not set.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
  });
};

module.exports = connectDB;
