import React, { Component, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Importar componentes
import Header from "./components/layout/Header";
import Clientes from "./components/clientes/Clientes";
import EditarCliente from './components/clientes/EditarCliente';
import NuevoCliente from './components/clientes/NuevoCliente';
import NuevoProducto from './components/productos/NuevoProducto'

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
                  <Route exact path="/" component={Clientes}/>
                  <Route exact path="/cliente/editar/:id" component={EditarCliente}/>
                  <Route exact path="/cliente/nuevo" component={NuevoCliente}/>
                  <Route exact path="/productos/nuevo" component={NuevoProducto}/>
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
