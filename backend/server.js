import express from 'express';
import mongoose from 'mongoose';
import boardRoutes from './routes/boardRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;  // or your hardcoded connection string

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    app.use('/api/board', boardRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error.message);
  }
}

startServer();
