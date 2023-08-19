const express = require('express');
const bodyParser = require('body-parser'); 
const { Pool } = require('pg');
const port = 3000;
const app = express();
const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
  });


app.use(bodyParser.json());
app.use(router)
// Rota para buscar todos os usuários
router.get('/', async (req, res) => {
    // Lógica para buscar e retornar todos os usuários
    try {
        const { rows } = await pool.query('SELECT * FROM usuarios');
        console.log(rows)
        res.json(rows);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  
  });

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    // Lógica para criar um novo usuário
    const { nome, email } = req.body;
    try {
      await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email]);
      res.json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  
  });  
  
// Teste de conexão com o banco de dados
pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conexão bem-sucedida! Hora atual no banco de dados:!', result.rows[0].now);
    }
  });


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

