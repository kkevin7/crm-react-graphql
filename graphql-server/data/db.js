import mongoose, { mongo } from 'mongoose';

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

mongoose.set('useFindAndModify', false);

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);

const productosSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number
});
const Productos = mongoose.model('productos', productosSchema);

//Pedidos
const pedidoSchema = new mongoose.Schema({
  pedido: Array,
  total: Number,
  fecha: Date,
  cliente: mongoose.Types.ObjectId,
  estado: String
});
const Pedidos = mongoose.model('pedidos', pedidoSchema);

export {Clientes, Productos, Pedidos}