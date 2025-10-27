import express from 'express';
import authRoute from './routes/authRoute.js';

const app = express();

app.use("/api/auth", authRoute);
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
