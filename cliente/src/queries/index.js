import gql from "graphql-tag";

export const CLIENTES_QUERY = gql`
  query getClientes($limite: Int, $offset: Int) {
    getClientes(limite: $limite, offset: $offset) {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
    totalClientes
  }
`;

export const CLIENTE_QUERY = gql`
  query ConsultarCliente($id: ID) {
    getCliente(id: $id) {
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
  }
`;

export const OBTENER_PRODUCTOS = gql`
query{
  obtenerProductos{
    id
    nombre
    precio
    stock
  }
}
`;
