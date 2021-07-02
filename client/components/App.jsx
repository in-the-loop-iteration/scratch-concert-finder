import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Search from './Search';
import Profile from './Profile';

const theme = extendTheme({});

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/callback/">
          <Search />
        </Route>
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

<<<<<<< HEAD
    return (

<ChakraProvider>
    <Search />

</ChakraProvider>
    );
}

export default App;
=======
export default App;
>>>>>>> 80a32bc66d6bb649a8ee70db2db0adeda75f53f7
