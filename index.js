const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conexão com o MongoDB local (criado via Compass)
mongoose.connect('mongodb+srv://jorewmario_db_user:VYI3VploxCCR4JWb@testandomongodb.izcp8zd.mongodb.net/?appName=TestandoMongoDB')
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
