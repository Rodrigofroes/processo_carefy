import express from 'express';
import FilmeController from '../controllers/filmeController.js';
import logRequest from '../middleware/logRequest.js';
import AuthLogin from '../middleware/AuthLogin.js';

const router = express.Router();
const filmeController = new FilmeController();
const auth = new AuthLogin();


router.post('/filme', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Adicionar um filme'
    filmeController.adicionarFilme(req, res);
});
router.get('/filme', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Listar filmes'
    filmeController.listarFilmes(req, res);
});
router.get('/filme/:id', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Consultar filme'
    filmeController.listarFilmeID(req, res);
});
router.put('/filme/:id/estado', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Atualizar estado do filme'
    filmeController.atualizarEstadoFilme(req, res);
});
router.post('/filme/:id/avaliar', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Avaliar filme'
    filmeController.avaliarFilme(req, res);
});

router.get('/filme/:estado', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Listar filmes por estado'
    filmeController.listarPorEstado(req, res);
});

router.get('/filme/:id/historico', auth.validar, logRequest, (req, res) => {
    // #swagger.tags = ['Filme']
    // #swagger.summary = 'Listar histórico do filme'
    filmeController.listarHistoricoIDFilme(req, res);
});

export default router;