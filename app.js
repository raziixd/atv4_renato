const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    // host: 'localhost',
    host: '172.18.0.2',
    user: 'user',
    password: '12345',
    database: 'db_atv4'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});
app.get('/', (req, res) => {
    res.status(200).send('oie');
});

app.get('/consulta-dados', (req, res) => {
    db.query('SELECT * FROM alunos', (err, results) => {
        if (err) {
            console.error('Erro ao consultar dados:', err);
            res.status(500).send('Erro ao consultar dados');
            return console.log(err);
        }
        res.json(results);
    });
});

app.get('/liveness', (req, res) => {
    res.status(200).send('BOA, TÔ VIVO!!!');
});

app.get('/readiness', (req, res) => {
    if (db) {
        res.status(200).send('Só manda, tô pronto');
    } else {
        res.status(500).send('Deu ruim, vê aí onde tu errou');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});