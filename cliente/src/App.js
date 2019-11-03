import React, { Component, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Importar componentes
import Header from "./components/layout/Header";
import Clientes from "./components/clientes/Clientes";
import EditarCliente from './components/clientes/EditarCliente';
import NuevoCliente from './components/clientes/NuevoCliente';
import NuevoProducto from './components/productos/NuevoProducto';
import Productos from './components/productos/Productos';
import EditarProducto from './components/productos/EditarProducto';
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkErrors", networkError);
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <Router>
            <Fragment>
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/clientes" component={Clientes}/>
                  <Route exact path="/clientes/editar/:id" component={EditarCliente}/>
                  <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
                  <Route exact path="/productos/nuevo" component={NuevoProducto}/>
                  <Route exact path="/productos" component={Productos}/>
                  <Route exact path="/productos/editar/:id" component={EditarProducto}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
