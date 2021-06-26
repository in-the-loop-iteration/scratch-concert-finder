import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Search from './Search';

const App = () => (
  <ChakraProvider>
    <Search />
  </ChakraProvider>
);

export default App;
