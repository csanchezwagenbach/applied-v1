import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import UserDash from './pages/UserDash';
import Navbar from './components/Navbar';
import CreateApp from './pages/CreateApp';
import UpdateApp from './pages/UpdateApp';
import PreviewApp from './pages/PreviewApp';
// import SearchApp from './pages/SearchApp';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={<Home/>} 
            />
            <Route 
              path="/userdash" 
              element={<UserDash/>} 
            />

            {/* <Route 
              path="/search" 
              element={<SearchApp/>} 
            />   */}

             <Route 
              path="/create" 
              element={<CreateApp/>} 
            />

            <Route 
              path="/update" 
              element={<UpdateApp/>} 
            />   


            <Route 
              path="/preview/:applicationId" 
              element={<PreviewApp/>} 
            /> 

            <Route 
              path='*' 
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;




















// import React from "react";
// import './App.css';
// import AppliedContainer from "./components/AppliedContainer";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// const App = () => <Home />;

// export default App;
