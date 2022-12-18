import express from 'express'
import AdminController from './controller'
import adminAuth from 'lib/utils/adminAuth'

import asyncHandler from "lib/utils/asyncHandler";

const router = express.Router()

router.post('/create', asyncHandler(adminAuth), asyncHandler(AdminController.createAdmin))

router.post('/login-step-one', asyncHandler(AdminController.loginStepOne))

router.post('/login-step-two', asyncHandler(AdminController.loginStepTwo))

router.post('/me', asyncHandler(adminAuth), asyncHandler(AdminController.me))

export default router
 