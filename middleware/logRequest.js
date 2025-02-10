import { openDb } from "../db/database.js";

export default async function logRequest(req, res, next) {
    const banco = await openDb();

    const sendResponse = res.send;

    res.send = async function (body) {
        const filmeId = typeof body === 'string' ? JSON.parse(body) : body;
        await banco.run(
            "INSERT INTO logs (filme_id, metodo, url, status) VALUES (?, ?, ?, ?)",
            [filmeId, req.method, req.originalUrl, res.statusCode]
        );

        return sendResponse.apply(res, arguments);
    };

    next();
}