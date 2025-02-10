export default class AuthLogin {
    async validar(req, res, next) {
        let token = req.cookies?.token;
        if (token !== '12345' || !token) {
            return res.status(401).send({
                mensagem: "Acesso não autorizado"
            });
        }
        next();
    }
}