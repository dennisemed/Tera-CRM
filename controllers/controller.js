// inicializar bcrypt
const bcrypt = require("bcrypt");

// inicializar Schema de dados de registro dos clientes
const Client = require("../models/model");



// Definição dos controllers

//TO-DO: testar funcionamento da API
exports.test = function (req, res) {
    res.send("olá! Teste de Controller");
}

// TO-DO: listar Clientes da BD
exports.details = function (req, res) {
  Client.find({}).then(function(Client){
    res.send(Client);
    });
};

// TO-DO: adicionar novo Cliente
exports.signUp = async (req, res) => { 

      // criar um novo usuário
      const user = new Client(req.body);
      // cria um salt de tamanho "10" para 'hashear' a senha
      const salt = await bcrypt.genSalt(10);
      // define a senha do usuario como a senha hasheada
      user.password = await bcrypt.hash(user.password, salt);
      // caso funcione, salva essa senha e envia a página mensagem confirmando o cadastro
      user.save().then((doc) => res.status(201).send("Cadastro efetuado com sucesso!"));
};

// TO-DO: atualizar dado de Cliente
// atualiza "Cliente" da BD com as propriedades em "req.body"
// depois, procura de novo na BD o "Cliente" atualizado (senão manda o Cliente // não atualizado!)
// depois, devolve o "Cliente" atualizado ao cliente
exports.update = function (req, res, next) {
  Client.findByIdAndUpdate({_id: req.params.id},
                     req.body).then(function(){
                      Client.findOne({_id: req.params.id}).then(function(Client){
        res.send(Client);
      });
    }).catch(next);
};

// TO-DO: apagar Cliente
// "_id:"->nome da propriedade na BD, 
// "req.params.id"->devolve-me o parametro id na req
exports.delete = function (req, res, next) {
    // apaga "Cliente" da BD, depois, devolve o "Cliente" apagado ao cliente
    Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
      res.send(Client);
    }).catch(next);
};

// TO-DO: login Cliente
exports.logIn = async (req, res) => {

  const body = req.body;
  const user = await Client.findOne({ email: body.email });

  if (user) {
    // checar a senha com a senha 'hasheada', guardada no banco de dados
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).send("Login efetuado com sucesso!");
    } else {
      res.status(400).send("Usuário ou senha incorretos");
    }
  } else {
    res.status(401).send("Usuário não encontrado");
  } 
}
