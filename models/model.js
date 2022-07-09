const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Clientes - Schema
const ClientSchema = new Schema({
    name: String,
    cnpj: String,
    address: String,
    email: String,
    password: String
// TO-DO: Registro de Cliente
});

// baseado em ClientSchema: ‘Clients’->nome da coleção
const Client = mongoose.model("Clients", ClientSchema);
// exportar Modelo_PI
module.exports = Client;