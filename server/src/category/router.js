
import express from "express";

import CategoryController from './controller'
import adminAuth from "lib/utils/adminAuth";
// import asyn

const router = express.Router();

router.post('/create',adminAuth, CategoryController.createCategory)

router.get('/', CategoryController.getCategories)

// router.post('/edit', adminAuth, Cate)

export default router; 