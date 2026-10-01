var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { MongoClient } = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contextRouter = require('./routes/contexto');
var canticoRouter = require('./routes/cantico');
var armRouter = require('./routes/armaduras');
var detalheRouter = require('./routes/detalhe');



var app = express();

// Connection String apontando para o banco 'db_rakens'
const uri = "mongodb+srv://jorewmario_db_user:DB29062009Jmmc@testandomongodb.izcp8zd.mongodb.net/db_rakens"

const client = new MongoClient(uri);

// Conexão assíncrona não-bloqueante
client.connect()
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    app.set('db', client.db('db_rakens'));
  })
  .catch(err => {
    console.error('❌ Erro na conexão com o MongoDB Atlas:', err.message);
  });

// Configuração da View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contexto', contextRouter);
app.use('/cantico', canticoRouter);
app.use('/armaduras', armRouter);
app.use('/detalhe', detalheRouter);


// Tratamento 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Tratamento de Erros Globais
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
