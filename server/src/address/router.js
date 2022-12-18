import express from 'express'
import controller from './controller'
import adminAuth from 'lib/utils/adminAuth'

import asyncHandler from "lib/utils/asyncHandler";

const router = express.Router()

router.post('/create', asyncHandler(controller.create))

router.post('/edit/:_id', asyncHandler(controller.edit))

router.get('/list', asyncHandler(controller.user_mylist))

router.post('/userlist', adminAuth, asyncHandler(controller.adming_hislist))

router.post('/delete', asyncHandler(controller.delete))

export default router
