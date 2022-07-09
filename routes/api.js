// inicializar app express
const express = require ("express");

// inicializar o router, declarado em app.js
const router = express.Router();

// importa controlador 'controller.js' da pasta: 
const apiController = require("../controllers/controller");



//Definição das rotas

// url do teste será: http://localhost:5000/teste
router.get("/teste", apiController.test);

// TO-DO: listar Clientes
router.get("/list",apiController.details);

// TO-DO: atualizar Cliente
router.put("/update/:id",apiController.update);

// TO-DO: apagar Cliente
router.delete("/delete/:id",apiController.delete);

// TO-DO: registrar Cliente
router.post("/signup", apiController.signUp);

// TO-DO: login do Cliente
router.post("/login", apiController.logIn);

module.exports = router;
