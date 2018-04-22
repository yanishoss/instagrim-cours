import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import configureStore from './store/store';
import Layout from './containers/Layout/Layout';

const store = configureStore();

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
