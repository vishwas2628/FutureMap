import express from 'express';
import authUser from '../middleware/authUser.js';
import { loginUser, registerUser,getUser } from '../controllers/userController.js';

const userRouter = express.Router();

// User registration route
userRouter.post('/signup', registerUser);

// User login route
userRouter.post('/login', loginUser);

// Fetch all user data
userRouter.get('/:id',authUser, getUser);


export default userRouter;