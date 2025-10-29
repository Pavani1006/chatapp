import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use("/api/auth", authRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
