// associar as dependências instaladas
const express = require('express');

// inicializar app express
const app = express();

// inicializar mongoose
const mongoose = require("mongoose");


// servidor à escuta na porta 5000
let port = 5000;
app.listen(port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});

// Enviar os arquivos "estaticos", como JS, CSS, imagens
app.use(express.static(__dirname));


// Middleware utilizado para tramitação dos dados 
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Determinação dos endereços das páginas 

// "Página Inicial"
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// "Painel de Vendas"
app.get("/sales", function (req, res) {
  res.sendFile(__dirname + "/vendas.html");
});

const bodyParsers = require("body-parser");
app.use(bodyParsers.urlencoded({extended: true}));

// "Página de Login’
app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

// "Página de Registro"
app.get("/signup", function(req, res) {
    res.sendFile(__dirname + "/signUp.html");
});


// todo o url começado por "/" chama as rotas em "./routes/api"
const routes = require("./routes/api");
app.use("/", routes);

// Conexão a base de dados do Mongodb

// Ligar á B.D.: 'mariadmaced'->user da BD, ´nnn´->pass
  mongoose.connect("mongodb+srv://mariadmaced:nnn@nodejscluster.cwhlhdk.mongodb.net/?retryWrites=true&w=majority");

// Confirma ligação no console
mongoose.connection.on("connected", function () {
  console.log("Connected to Database "+"test");
});

// Se a ligação a BD falhar, exibe mensagem de Erro
mongoose.connection.on("error", (err) => {
  console.log("Database error "+err);
});
