import express from "express";

import UserController from './controller'
import asyncHandler from "lib/utils/asyncHandler";
import adminAuth from 'lib/utils/adminAuth'


const router = express.Router();

router.post('/sign-up-one', asyncHandler(UserController.signup_stepOne))

router.post('/sign-up-two', asyncHandler(UserController.signup_stepTwo))

router.post('/login-one', asyncHandler(UserController.login_stepOne))

router.post('/login-two', asyncHandler(UserController.login_stepTwo))

router.post('/me', asyncHandler(UserController.me))

router.post('/edit', asyncHandler(UserController.userEdit))

router.post('/allusers', asyncHandler(UserController.userList))

// router.get('/', AdminController.home)

// router.post('/create', AdminController.createAdmin)

// router.post('/login-step-one', AdminController.loginStepOne)

// router.post('/login-step-two', AdminController.loginStepTwo)

export default router;