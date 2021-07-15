import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Search from './Search';
import Profile from './Profile';
import Footer from './Footer';
import Header from './header';
import '../style.css';

const theme = extendTheme({});

const App = () => (
  <div>
  <Header />
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/">
          <Search />
        </Route>
        <Route path="/callback/">
          <Search />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
  <Footer/>
  </div>
);

export default App;
