import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//context
import { UserProvider } from "./context/UserContext";

//ui
import { Fabric } from '@fluentui/react'
import { initializeIcons } from '@uifabric/icons';

//apollo
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink,
  from } from '@apollo/react-hooks'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from "apollo-link-context";

// import * as serviceWorker from './serviceWorker';
import { UserRoleProvider } from './context/UserRoleContext';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_BACKENDURL,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link = from([
  // errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

//icons
initializeIcons();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Fabric>
      <UserProvider>
        <UserRoleProvider>          
          <App />
        </UserRoleProvider>
      </UserProvider>
    </Fabric>
  </ApolloProvider>
,
  document.getElementById('root')
);

//serviceWorker.unregister();
