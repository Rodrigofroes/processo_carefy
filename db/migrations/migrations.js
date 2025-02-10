import { openDb } from "../database.js";

export default async function Migrations() {
    openDb().then(async db => {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS filmes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,        
                tmdb_id INTEGER NOT NULL,
                titulo TEXT NOT NULL,      
                sinopse TEXT,                      
                data_lancamento DATE,
                genero TEXT,
                caminho_poster TEXT, 
                estado TEXT CHECK (estado IN ('A assistir', 'Assistido', 'Avaliado', 'Recomendado', 'Não recomendado')) DEFAULT 'A assistir',
                nota REAL,
                data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS Logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                metodo TEXT NOT NULL,
                url TEXT NOT NULL,
                status INTEGER NOT NULL,
                filme_id INTEGER,
                data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.exec(`
            CREATE TABLE IF NOT EXISTS Historico (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filme_id INTEGER NOT NULL,
                acao TEXT NOT NULL CHECK (acao IN ('Adicionado', 'Atualizado', 'Avaliado')),
                data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
    })
}
