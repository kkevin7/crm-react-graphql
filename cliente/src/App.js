import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

//Importar componentes
import Header from './components/Header';

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
        <Header/>
          <h1>Hola</h1>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
