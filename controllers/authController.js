export default class AuthController {
    async login(req, res) {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).send({
                mensagem: "Usuário e senha são obrigatórios"
            });
        }

        if (usuario == 'admin' && senha == 'admin') {
            res.cookie("token", '12345', {
                httpOnly: true
            });
            return res.status(200).send({
                token: '12345'
            });
        }

        return res.status(401).send({
            mensagem: "Usuário ou senha inválidos"
        });
    }
}