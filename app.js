/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose'); // 1. Importa o Mongoose

// 2. Conecta ao MongoDB Compass (local)
mongoose.connect('mongodb+srv://jorewmario_db_user:VYI3VploxCCR4JWb@testandomongodb.izcp8zd.mongodb.net/?appName=TestandoMongoDB')
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contextRouter = require('./routes/contexto');
var armRouter = require('./routes/armaduras');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contexto', contextRouter);
app.use('/armaduras', armRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/

/* var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 1. Importa o cliente do MongoDB Nativo
const { MongoClient } = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contextRouter = require('./routes/contexto');
var armRouter = require('./routes/armaduras');

var app = express();

// 2. Cole a sua Connection String do MongoDB Atlas aqui
const uri = "mongodb+srv://jorewmario_db_user:VYI3VploxCCR4JWb@testandomongodb.izcp8zd.mongodb.net/db_rakens?appName=TestandoMongoDB"; 

const client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log('Conectado com sucesso ao MongoDB Atlas via Connection String!');
    // Guarda o banco de dados na aplicação para usar nas rotas
    app.set('db', client.db('projetorakens'));
  })
  .catch(err => console.error('Erro de conexão ao MongoDB Atlas:', err));

// Configuração da View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contexto', contextRouter);
app.use('/armaduras', armRouter);

// Trata erro 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Trata outros erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/

/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 1. Importa o driver nativo do MongoDB
const { MongoClient } = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contextRouter = require('./routes/contexto');
var armRouter = require('./routes/armaduras');

var app = express();

// 2. String de Conexão com o MongoDB Atlas
// ATENÇÃO: Substitua <sua_senha> pela sua senha real do banco de dados
const uri = "mongodb+srv://jorewmario_db_user:amoreraridade14@testandomongodb.izcp8zd.mongodb.net/exercicos?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// 3. Função assíncrona para garantir a conexão ANTES de receber requisições
async function conectarBanco() {
  try {
    await client.connect();
    console.log('✅ Conectado com sucesso ao MongoDB Atlas!');
    
    // Guarda a referência do banco de dados 'exercicos' na aplicação Express
    app.set('db', client.db('db_rakens'));
  } catch (err) {
    console.error('❌ Erro CRÍTICO ao conectar ao MongoDB Atlas:', err);
  }
}

// Inicia a tentativa de conexão
conectarBanco();

// Configuração da View Engine (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Configuração das Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contexto', contextRouter);
app.use('/armaduras', armRouter);

// Tratamento de erro 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Tratamento de erros do servidor
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { MongoClient } = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contextRouter = require('./routes/contexto');
var armRouter = require('./routes/armaduras');

var app = express();

// Connection String apontando para o banco 'db_rakens'
const uri = "mongodb+srv://jorewmario_db_user:amoreraridade14@testandomongodb.izcp8zd.mongodb.net/db_rakens";

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
app.use('/armaduras', armRouter);

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
