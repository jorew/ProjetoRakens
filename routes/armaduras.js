var express = require('express');
var router = express.Router();

// Exemplo de rota dinâmica no Express
router.get('/equip/:slug', async (req, res) => {
  try {
    const item = await Equipamento.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).render('error', { message: 'Equipamento não encontrado' });
    
    res.render('equip/detalhe', { item });
  } catch (error) {
    res.status(500).send('Erro no servidor');
  }
});

router.get('/', function(req, res, next) {
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
