const express = require('express');
const router = express.Router();
const connection = require('./config');

router.post('/leads', (req, res) => {
    const { nome, telefone, email, cursoInteresse } = req.body;

    const query = 'INSERT INTO Leads (Nome, Telefone, Email, CursoInteresse) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, telefone, email, cursoInteresse], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao cadastrar o lead' });
        }
        res.status(201).json({ message: 'Lead cadastrado com sucesso!' });
    });
});

router.get('/leads', (req, res) => {
    const { nome, email, cursoInteresse } = req.query;

    let query = 'SELECT * FROM Leads WHERE 1=1';
    const params = [];

    if (nome) {
        query += ' AND Nome LIKE ?';
        params.push(`%${nome}%`);
    }

    if (email) {
        query += ' AND Email LIKE ?';
        params.push(`%${email}%`);
    }

    if (cursoInteresse) {
        query += ' AND CursoInteresse = ?';
        params.push(cursoInteresse);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao consultar os leads' });
        }
        res.status(200).json(results);
    });
});


router.post('/alunos/matricular', (req, res) => {
    const { nome, telefone, email, cursoId, turmaId } = req.body;

    const queryMatricula = 'SELECT MAX(CodigoMatricula) AS maxCodigo FROM Alunos';
    connection.query(queryMatricula, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao gerar código de matrícula' });
        }

        const codigoMatricula = (results[0].maxCodigo || 0) + 1;
        
        const queryAluno = 'INSERT INTO Alunos (CodigoMatricula, Nome, Telefone, Email, CursoId, TurmaId) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(queryAluno, [codigoMatricula, nome, telefone, email, cursoId, turmaId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao matricular o aluno' });
            }
            res.status(201).json({ message: 'Aluno matriculado com sucesso!' });
        });
    });
});


router.get('/turmas', (req, res) => {
    const { cursoId } = req.query;

    const query = 'SELECT * FROM Turmas WHERE CursoId = ?';
    connection.query(query, [cursoId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar as turmas' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
