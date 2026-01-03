import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.meddleware.js'

const router = express.Router();

router.post('/login', login)

router.post('/signup', signup)

router.post('/logout', logout)

router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({success: true, user: req.user})
})


export default router