import express from 'express';
import LogsController from '../controllers/logsController.js';
import AuthLogin from '../middleware/AuthLogin.js';

const router = express.Router();
const logsController = new LogsController();
const auth = new AuthLogin();

router.get('/logs', auth.validar, (req, res) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Listar logs'
    logsController.listarLogs(req, res);
});

export default router;