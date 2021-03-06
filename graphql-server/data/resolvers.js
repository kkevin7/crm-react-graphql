import mongoose, { Promise } from "mongoose";
import { Clientes, Productos, Pedidos, Usuarios } from "./db";
import { rejects } from "assert";

export const resolvers = {
  Query: {
    getClientes: (root, { limite, offset }) => {
      return Clientes.find({})
        .limit(limite)
        .skip(offset);
    },
    getCliente: (root, { id }) => {
      return new Promise((resolve, rejects) => {
        Clientes.findById(id, (error, cliente) => {
          if (error) rejects(error);
          else resolve(cliente);
        });
      });
    },
    totalClientes: root => {
      return new Promise((resolve, object) => {
        Clientes.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        });
      });
    },
    obtenerProductos: (root, { limite, offset, stock }) => {
      let filtro;
      if (stock) {
        filtro = { stock: { $gt: 0 } };
      }
      return Productos.find(filtro)
        .limit(limite)
        .skip(offset);
    },
    obtenerProducto: (root, { id }) => {
      return new Promise((resolve, object) => {
        Productos.findById(id, (error, producto) => {
          if (error) rejects(error);
          else resolve(producto);
        });
      });
    },
    totalProductos: root => {
      return new Promise((resolve, object) => {
        Productos.countDocuments({}, (error, count) => {
          if (error) rejects(error);
          else resolve(count);
        });
      });
    },
    obtenerPedidos: (root, { cliente }) => {
      return new Promise((resolve, object) => {
        Pedidos.find({ cliente: cliente }, (error, pedido) => {
          if (error) rejects(error);
          else resolve(pedido);
        });
      });
    },
    topClientes: root => {
      return new Promise((resolve, object) => {
        Pedidos.aggregate([
          {
            $match: { estado: "COMPLETADO" }
          },
          {
            $group: {
              _id: "$cliente",
              total: { $sum: "$total" }
            }
          },
          {
            $lookup: {
              from: "clientes",
              localField: "_id",
              foreignField: "_id",
              as: "cliente"
            }
          },
          {
            $sort: {
              total: -1
            }
          },
          {
            $limit: 10
          }
        ], (error, resultado) => {
          if(error) rejects(error);
          else resolve(resultado);
        });
      });
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        edad: input.edad,
        tipo: input.tipo,
        pedidos: input.pedidos
      });
      nuevoCliente.id = nuevoCliente._id;

      return new Promise((resolve, rejects) => {
        nuevoCliente.save(error => {
          if (error) rejects(error);
          else resolve(nuevoCliente);
        });
      });
    },
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, rejects) => {
        Clientes.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, cliente) => {
            if (error) rejects(error);
            else resolve(cliente);
          }
        );
      });
    },
    eliminarCliente: (root, { id }) => {
      return new Promise((resolve, rejects) => {
        Clientes.findOneAndRemove({ _id: id }, error => {
          if (error) rejects(error);
          else resolve("Se eliminó correctamente");
        });
      });
    },
    nuevoProducto: (root, { input }) => {
      const nuevoProducto = new Productos({
        nombre: input.nombre,
        precio: input.precio,
        stock: input.stock
      });
      //mongo db crea el ID que se asigna al objeto
      nuevoProducto.id = nuevoProducto._id;
      return new Promise((resolve, object) => {
        nuevoProducto.save(error => {
          if (error) rejects(error);
          else resolve(nuevoProducto);
        });
      });
    },
    actualizarProducto: (root, { input }) => {
      return new Promise((resolve, producto) => {
        Productos.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, producto) => {
            if (error) rejects(error);
            else resolve(producto);
          }
        );
      });
    },
    eliminarProducto: (root, { id }) => {
      return new Promise((resolve, producto) => {
        Productos.findOneAndRemove({ _id: id }, error => {
          if (error) rejects(error);
          else resolve("Se eliminó correctamente");
        });
      });
    },
    nuevoPedido: (root, { input }) => {
      const nuevoPedido = new Pedidos({
        pedido: input.pedido,
        total: input.total,
        fecha: new Date(),
        cliente: input.cliente,
        estado: "PENDIENTE"
      });

      nuevoPedido.id = nuevoPedido._id;
      return new Promise((resolve, object) => {
        // recorrer y actualizar la cantidad de productos

        nuevoPedido.save(error => {
          if (error) rejects(error);
          else resolve(nuevoPedido);
        });
      });
    },
    actualizarEstado: (root, { input }) => {
      return new Promise((resolve, object) => {
        const { estado } = input;

        let instruccion;
        if (estado === "COMPLETADO") {
          instruccion = "-";
        } else if (estado === "CANCELADO") {
          instruccion = "+";
        }

        //recorrer y actualizar la cantidad de productos en base al estado del pedido
        input.pedido.forEach(pedido => {
          Productos.updateOne(
            { _id: pedido.id },
            {
              $inc: { stock: `${instruccion}${pedido.cantidad}` }
            },
            function(error) {
              if (error) return new Error(error);
            }
          );
        });

        Pedidos.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          error => {
            if (error) rejects(error);
            else resolve("Se actualizó correctamente");
          }
        );
      });
    },
    crearUsuario: async(root, {usuario, password}) => {
      //revisar si un usario contiene ese pasword
      const existeUsuario = await Usuarios.findOne({usuario: usuario});
      if(existeUsuario){
        throw new Error('El usuario ya existe');
      }

      const nuevoUsuario = await new Usuarios({
        usuario,
        password
      }).save();

      return "Creado Correctamente";
    }
  }
};
