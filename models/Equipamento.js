
/* const mongoose = require('mongoose');

const equipamentoSchema = new mongoose.Schema({
  _id: { type: Number, required: true },               // Chave primária customizada (ex: 1, 2, 3...)
  slug: { type: String, required: true, unique: true }, // ex: "1encantamento"
  nome: { type: String, required: true },               // ex: "Encantamento"
  dono: { type: String, required: true },               // ex: "Nome do Personagem"
  conceito: { type: String, required: true },           // ex: "Conceito da armadura..."
  dignidade: { type: String, required: true },          // ex: "Alta", "Nobre", etc.
  habilidades: [{ type: String }],                      // Array de strings para as habilidades
  descricao: { type: String }                           // Descrição geral (opcional)
});

module.exports = mongoose.model('Equipamento', equipamentoSchema, 'equipamentos');

*/