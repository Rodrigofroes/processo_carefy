import express from 'express';
import LogsController from '../controllers/logsController.js';

const router = express.Router();
const logsController = new LogsController();

router.get('/logs', (req, res) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Listar logs'
    logsController.listarLogs(req, res);
});

export default router;