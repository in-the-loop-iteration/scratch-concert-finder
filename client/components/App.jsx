import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Search from './Search';
import Profile from './Profile';

const App = () => (
  <ChakraProvider>
    <Router>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
);

export default App;
