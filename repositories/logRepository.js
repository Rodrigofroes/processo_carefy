import { openDb } from "../db/database.js";

const db = openDb();

export default class LogRepository {
    async adicionarLog(log){
        const banco = await db;
        const cadastrar = await banco.run('INSERT INTO logs (metodo, url, status, filme_id) VALUES (?, ?, ?, ?)', [log.metodo, log.url, log.status, log.filme_id]);
        return cadastrar;
    }

    async listarLogs(){
        const banco = await db;
        const listar = await banco.all('SELECT * FROM logs');
        return listar;
    }
}