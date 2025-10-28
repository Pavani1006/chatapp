import express from 'express';
import { signup } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { logout } from '../controllers/authController.js';

const route = express.Router();

route.get('/signup', signup);
route.get('/login', login);
route.get('/logout', logout);

export default route;