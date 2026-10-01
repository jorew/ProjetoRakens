const express = require('express');
const router = express.Router();

// 1. ROTA DA LISTA (Mostra todas as armaduras)
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(503).send('Servidor a conectar à base de dados...');

    const listaArmaduras = await db.collection('equipamentos').find({}).toArray();
    res.render('equip/armaduras', { armaduras: listaArmaduras });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar armaduras');
  }
});

// 2. ROTA DE DETALHES (Mostra uma armadura específica)
router.get('/equip/:slug', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(503).send('Servidor a conectar à base de dados...');

    // Captura o slug vindo da URL (ex: "1encantamento" ou "2paixao")
    const slugParam = req.params.slug;

    // Busca no MongoDB pelo campo 'slug' ou 'les_'
    const armaduraEncontrada = await db.collection('equipamentos').findOne({
      $or: [
        { slug: slugParam },
        { les_: slugParam }
      ]
    });

    // Se não encontrar nenhuma armadura com esse slug
    if (!armaduraEncontrada) {
      return res.status(404).send('Armadura não encontrada!');
    }

    // Renderiza a view views/equip/detalhe.ejs passando o objeto 'item'
    res.render('equip/detalhe', { item: armaduraEncontrada });

  } catch (err) {
    console.error('Erro ao buscar detalhe:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
