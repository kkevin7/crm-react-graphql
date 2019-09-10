import React, { Component, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Importar componentes
import Header from "./components/Header";
import Clientes from "./components/clientes/Clientes";
import EditarCliente from './components/clientes/EditarCliente';
import NuevoCliente from './components/clientes/NuevoCliente';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
