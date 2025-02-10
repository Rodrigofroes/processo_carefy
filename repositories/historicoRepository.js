import { openDb } from "../db/database.js";

const db = openDb();

export default class HistoricoRepository {
    async adicionarHistorico(historico) {
        const banco = await db;
        const cadastrar = await banco.run('INSERT INTO historico (filme_id, acao) VALUES (?, ?)',
            [historico.filme_id, historico.acao]);

        return cadastrar;
    }

    async listarHistorico(page = 1, limite = 5) {
        const banco = await db;
        const offset = (page - 1) * limite;
        const listar = await banco.all('SELECT * FROM historico LIMIT ? OFFSET ?', [limite, offset]);
        const { total } = await banco.get('SELECT COUNT(*) AS total FROM historico');
        return {
            listar,
            total,
            totalPages: Math.ceil(total / limite),
            currentPage: page
        };
    }

    async listarHistoricoIDFilme(id) {
        const banco = await db;
        const listar = await banco.all('SELECT * FROM historico WHERE filme_id = ? ', [id]);
        return listar;
    }
}