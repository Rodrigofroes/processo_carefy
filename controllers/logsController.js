import LogRepository from "../repositories/logRepository.js";

export default class LogsController {
    async listarLogs(req, res){
        const logsRepository = new LogRepository();
        const listar = await logsRepository.listarLogs();
        if (listar.length == 0) {
            return res.status(404).send({
                mensagem: "Nenhum log encontrado"
            });
        }
        return res.status(200).json(listar);
    }
}