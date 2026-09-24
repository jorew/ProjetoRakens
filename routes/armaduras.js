/*const express = require('express');
const router = express.Router();
const Equipamento = require('../models/Equipamento');

// 1. Rota para a lista principal de armaduras (Acesso em: http://localhost:3000/armaduras)
router.get('/', async (req, res) => {
  try {
    // Busca todas as armaduras no MongoDB
    const listaArmaduras = await Equipamento.find();
    
    // Renderiza a view views/equip/armaduras.ejs enviando os dados buscados
    res.render('equip/armaduras', { armaduras: listaArmaduras });
  } catch (error) {
    console.error('Erro ao buscar armaduras:', error);
    res.status(500).send('Erro ao carregar a lista de armaduras');
  }
});

// 2. Rota dinâmica para a página individual de cada armadura
router.get('/equip/:slug', async (req, res) => {
  try {
    const item = await Equipamento.findOne({ slug: req.params.slug });
    
    if (!item) {
      return res.status(404).render('error', { message: 'Equipamento não encontrado' });
    }
    
    res.render('equip/detalhe', { item });
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;

/*router.get('/', function(req, res, next) {
  res.render('equip/armaduras');
});

router.get('/1encantamento', (req, res) => {
  res.render('equip/1encantamento');
});

router.get('/2punicao', (req, res) => {
  res.render('equip/2punicao');
});

router.get('/3paixao', (req, res) => {
  res.render('equip/3paixao');
});

router.get('/4tempo', (req, res) => {
  res.render('equip/4tempo');
});

router.get('/5abismo', (req, res) => {
  res.render('equip/5abismo');
});

router.get('/6catastrofe', (req, res) => {
  res.render('equip/6catastrofe');
});

router.get('/7criacao', (req, res) => {
  res.render('equip/7criacao');
});

router.get('/8som', (req, res) => {
  res.render('equip/8som');
});

router.get('/9extincao', (req, res) => {
  res.render('equip/9extincao');
});

router.get('/10esperanca', (req, res) => {
  res.render('equip/10esperanca');
});

module.exports = router;
*/


/* var express = require('express');
var router = express.Router();

// Rota para a lista principal (/armaduras)
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(500).send('Servidor a conectar ao banco de dados...');

    // Procura na coleção "equipamentos" no Atlas
    const listaArmaduras = await db.collection('equipamentos').find({}).toArray();
    res.render('equip/armaduras', { armaduras: listaArmaduras });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar armaduras no banco de dados');
  }
});

// Rota dinâmica (/armaduras/equip/1encantamento)
router.get('/equip/:slug', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(500).send('Servidor a conectar ao banco de dados...');

    const item = await db.collection('equipamentos').findOne({ slug: req.params.slug });
    
    if (!item) {
      return res.status(404).render('error', { message: 'Equipamento não encontrado' });
    }

    res.render('equip/detalhe', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
*/

/* var express = require('express');
var router = express.Router();

// Rota principal (/armaduras)
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(500).send('Servidor a conectar ao banco de dados...');

    // Busca todos os documentos na coleção 'equipamentos' do banco 'db_rakens'
    const listaArmaduras = await db.collection('equipamentos').find({}).toArray();
    res.render('equip/armaduras', { armaduras: listaArmaduras });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar armaduras no banco de dados');
  }
});

// Rota dinâmica (/armaduras/equip/10esperanca)
router.get('/equip/:slug', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(500).send('Servidor a conectar ao banco de dados...');

    // Busca pelo campo 'les_' que é onde estão salvos os slugs no seu Atlas
    const item = await db.collection('equipamentos').findOne({ les_: req.params.slug });
    
    if (!item) {
      return res.status(404).render('error', { message: 'Equipamento não encontrado' });
    }

    res.render('equip/detalhe', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
*/

var express = require('express');
var router = express.Router();

// Rota Principal: Lista todas as armaduras (/armaduras)
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) {
      return res.status(503).send('Servidor a conectar à base de dados... Por favor, recarregue a página.');
    }

    const listaArmaduras = await db.collection('equipamentos').find({}).toArray();
    res.render('equip/armaduras', { armaduras: listaArmaduras });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar armaduras na base de dados');
  }
});

// Rota Dinâmica: Detalhes da armadura (/armaduras/equip/10esperanca)
router.get('/equip/:slug', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) {
      return res.status(503).send('Servidor a conectar à base de dados... Por favor, recarregue a página.');
    }

    // Procura pelo campo 'les_' que contém os slugs no teu Atlas
    const item = await db.collection('equipamentos').findOne({ les_: req.params.slug });
    
    if (!item) {
      return res.status(404).render('error', { message: 'Equipamento não encontrado' });
    }

    res.render('equip/detalhe', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;