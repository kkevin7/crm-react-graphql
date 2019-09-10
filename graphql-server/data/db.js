import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/clientes', {
    useNewUrlParser: true,
    "auth": { "authSource": "admin" },
    "user": "root",
    "pass": "12345",
  }).catch(error => console.log(error));

// mongoose.connect('mongodb://localhost:27017/clientes', {
//   useNewUrlParser: true
// }).catch(error => console.log(error));

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array
})

const Clientes = mongoose.model('clientes', clientesSchema);

export {Clientes}