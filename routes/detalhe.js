const express = require('express');
const router = express.Router();

// GET /detalhe/:slug
router.get('/:slug', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) return res.status(503).send('A conectar à base de dados...');

    const slugParam = req.params.slug;

    // Procura no MongoDB Atlas pelo slug ou les_
    const armaduraEncontrada = await db.collection('equipamentos').findOne({
      $or: [
        { slug: slugParam },
        { les_: slugParam }
      ]
    });

    if (!armaduraEncontrada) {
      return res.status(404).send('Armadura não encontrada!');
    }

    // Renderiza a view views/equip/detalhe.ejs
    res.render('equip/detalhe', { item: armaduraEncontrada });

  } catch (err) {
    console.error('Erro ao buscar detalhe:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
