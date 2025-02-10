import FilmesApiAdapter from "../adapter/filmes.js";
import FilmeEntity from "../entities/filmeEntity.js";
import HistoricoEntity from "../entities/historicoEntity.js";
import FilmeRepository from "../repositories/filmeRepository.js";
import HistoricoRepository from "../repositories/historicoRepository.js";

export default class FilmeController {
    async adicionarFilme(req, res) {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).send("O nome do filme é obrigatório");
        }
        const filme = new FilmesApiAdapter();
        const consultar = await filme.consultarFilmes(nome);
        if (consultar.length == 0) {
            return res.status(404).send({
                mensagem: "Filme não encontrado"
            });
        }

        const data = consultar[0];
        const filmeEntity = new FilmeEntity(
            null,
            data.id,
            data.title,
            data.overview,
            data.release_date,
            data.genre_ids,
            data.poster_path,
        );

        const filmeRepository = new FilmeRepository();
        const cadastrar = await filmeRepository.adicionarFilme(filmeEntity);
        if (!cadastrar.changes) {
            return res.status(500).send({
                mensagem: "Erro ao cadastrar filme"
            });
        }


        const historicoEntity = new HistoricoEntity(
            null,
            cadastrar.lastID,
            "Adicionado",
        );

        const historicoRepository = new HistoricoRepository();
        const historico = await historicoRepository.adicionarHistorico(historicoEntity);
        if (!historico.changes) {
            return res.status(500).send({
                mensagem: "Erro ao cadastrar histórico"
            });
        }

        return res.status(201).json(cadastrar.lastID);
    }

    async listarFilmes(req, res) {
        const { page } = req.query;
        const { estado } = req.query;

        const filmeRepository = new FilmeRepository();
        const listar = await filmeRepository.listarFilmes(page, estado);
        if (listar.length == 0) {
            return res.status(404).send({
                mensagem: "Nenhum filme encontrado"
            });
        }
        return res.status(200).json(listar);
    }

    async listarFilmeID(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("O id do filme é obrigatório");
        }

        const filmeRepository = new FilmeRepository();
        const listar = await filmeRepository.listarFilmeID(id);
        if (!listar) {
            return res.status(404).send({
                mensagem: "Filme não encontrado"
            });
        }
        return res.status(200).json(listar);
    }

    async atualizarEstadoFilme(req, res) {
        const { id } = req.params;
        const { estado } = req.body;
        const estados = ['A assistir', 'Assistido', 'Avaliado', 'Recomendado', 'Não recomendado'];
        if (!id) {
            return res.status(400).send(id);
        }
        if (!estado || !estados.includes(estado)) {
            return res.status(400).send(id);
        }

        const filmeRepository = new FilmeRepository();
        const atualizar = await filmeRepository.atualizarEstadoFilme(id, estado);
        if (!atualizar.changes) {
            return res.status(500).send(id);
        }

        const historicoEntity = new HistoricoEntity(
            null,
            id,
            "Atualizado",
        );

        const historicoRepository = new HistoricoRepository();
        const historico = await historicoRepository.adicionarHistorico(historicoEntity);
        if (!historico.changes) {
            return res.status(500).send(id);
        }

        return res.status(200).json(id);
    }

    async avaliarFilme(req, res) {
        const { id } = req.params;
        const { nota } = req.body;
        if (!id) {
            return res.status(400).send({
                mensagem: "O id do filme é obrigatório"
            });
        }
        if (!nota || nota < 0 || nota > 5) {
            return res.status(400).send({
                mensagem: "A nota do filme é obrigatória e deve ser um número entre 0 e 5"
            });
        }
        const filmeRepository = new FilmeRepository();

        const buscar = await filmeRepository.listarFilmeID(id);
        if (buscar.length == 0) {
            return res.status(404).send({
                mensagem: "Filme não encontrado"
            });
        }

        if (buscar.estado != "Assistido") {
            return res.status(400).send(id);
        }

        const avaliar = await filmeRepository.avaliarFilme(id, nota);
        if (!avaliar.changes) {
            return res.status(500).send({
                mensagem: "Erro ao avaliar filme"
            });
        }

        const historicoEntity = new HistoricoEntity(
            null,
            id,
            "Avaliado",
        );

        const historicoRepository = new HistoricoRepository();
        const historico = await historicoRepository.adicionarHistorico(historicoEntity);
        if (!historico.changes) {
            return res.status(500).send({
                mensagem: "Erro ao cadastrar histórico"
            });
        }

        return res.status(200).json(id);
    }

    async listarPorEstado(req, res) {
        const { estado } = req.params;

        const estados = ['A assistir', 'Assistido', 'Avaliado', 'Recomendado', 'Não recomendado'];

        if (!estado || !estados.includes(estado)) {
            return res.status(400).send({
                mensagem: "O estado do filme é obrigatório e deve ser um dos seguintes: A assistir, Assistido, Avaliado, Recomendado, Não recomendado"
            });
        }

        const filmeRepository = new FilmeRepository();
        const listar = await filmeRepository.filtrarPorEstado(estado);
        if (listar.length == 0) {
            return res.status(404).send({
                mensagem: "Nenhum filme encontrado"
            });
        }

        return res.status(200).json(listar);
    }

    async listarHistoricoIDFilme(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("O id do filme é obrigatório");
        }

        const historicoRepository = new HistoricoRepository();
        const listar = await historicoRepository.listarHistoricoIDFilme(id);

        if (listar.length == 0) {
            return res.status(404).send({
                mensagem: "Histórico não encontrado"
            });
        }

        return res.status(200).json(listar);
    }
}