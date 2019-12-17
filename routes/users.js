const express = require('express');
const router = express.Router();
const Users = require('../model/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//FUNCOES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_exprires_in });
}


router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({error: 'Erro na consulta de usuarios!'});
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!'});

    try {
        if(await Users.findOne({email})) res.status(400).send({ error: "Usuario já registrado"});
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({ user, token: createUserToken(user.id) });
    } catch (err) {
        return res.status(500).send({ error: "Erro ao buscar usuario!" });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if(!user) return res.status(400).send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, data.password);
        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar o usuário!' });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
})


module.exports = router

/*

200 - ok
201 - created
202 - accepted

400 - bad request
401 - unauthorized -- autenticacao, tem carater temporario
403 - forbidden    -- autorizacao, tem carater permanente
404 - not found

500 - internal server error
501 - not implemented - a API nao suporta essa funcionalidade
503 - service unavailable - a API executa essa operação, mas no momento está indisponivel


*/