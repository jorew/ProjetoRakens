const express = require('express');
const router = express.Router();

// ROTA DA LISTA (Mostra todas as armaduras na página /armaduras)
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

module.exports = router;
