import express from 'express';
import { signup } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { logout } from '../controllers/authController.js';
import { editProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const route = express.Router();

// To handle signup
route.post('/signup', signup);

// To handle login
route.post('/login', login);

// To handle logout
route.get('/logout', logout);

// To handle profile update
route.put('/edit-profile',authMiddleware, editProfile);

export default route;