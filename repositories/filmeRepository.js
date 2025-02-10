import { openDb } from "../db/database.js";

const db = openDb();

export default class FilmeRepository {
    async adicionarFilme(filme) {
        const banco = await db;
        const cadastrar = await banco.run('INSERT INTO filmes (id, tmdb_id, titulo, sinopse, data_lancamento, genero, caminho_poster, nota) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [filme.id, filme.tmdb_id, filme.titulo, filme.sinopse, filme.data_lancamento,
            JSON.stringify(filme.genero), filme.caminho_poster, filme.nota]);

        return cadastrar;
    }

    async listarFilmes(page = 1, estado) {
        const banco = await db;
        const limite = 5;
        const offset = (page - 1) * limite;
        let listar;

        if (estado) {
            listar = await banco.all('SELECT * FROM filmes WHERE estado = ? LIMIT ? OFFSET ?', [estado, parseInt(limite), parseInt(offset)]);
        } else {
            listar = await banco.all('SELECT * FROM filmes LIMIT ? OFFSET ?', [parseInt(limite), parseInt(offset)]);
        }

        const { total } = await banco.get('SELECT COUNT(*) AS total FROM filmes');

        return {
            listar,
            total,
            totalPages: Math.ceil(total / limite),
            currentPage: page
        };
    }


    async listarFilmeID(id) {
        const banco = await db;
        const listar = await banco.get("SELECT * FROM filmes WHERE id = ?", [id]);
        return listar;
    }

    async atualizarEstadoFilme(id, estado) {
        const banco = await db;
        const atualizar = await banco.run("UPDATE filmes SET estado = ? WHERE id = ?", [estado, id]);
        return atualizar;
    }

    async avaliarFilme(id, nota) {
        const banco = await db;
        const avaliar = await banco.run("UPDATE filmes SET nota = ? WHERE id = ?", [nota, id]);
        return avaliar;
    }

    async filtrarPorEstado(estado) {
        const banco = await db;
        const listar = await banco.all("SELECT * FROM filmes WHERE estado = ?", [estado]);
        return listar;
    }
}
