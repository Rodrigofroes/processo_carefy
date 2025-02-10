import { openDb } from "../db/database.js";

const db = openDb();

export default class LogRepository {
    async adicionarLog(log) {
        const banco = await db;
        const cadastrar = await banco.run('INSERT INTO logs (metodo, url, status, filme_id) VALUES (?, ?, ?, ?)', [log.metodo, log.url, log.status, log.filme_id]);
        return cadastrar;
    }

    async listarLogs(page = 1, limite = 5) {
        const banco = await db;
        const offset = (page - 1) * limite;

        const listar = await banco.all('SELECT * FROM logs LIMIT ? OFFSET ?', [parseInt(limite), parseInt(offset)]);
        const { total } = await banco.get('SELECT COUNT(*) AS total FROM logs');

        return {
            listar,
            total,
            totalPages: Math.ceil(total / limite),
            currentPage: page
        };
    }
}