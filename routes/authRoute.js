import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', (req, res) => {
    // #swagger.tags = ['Autenticação']
    // #swagger.summary = 'Login'
    authController.login(req, res);
});

export default router;