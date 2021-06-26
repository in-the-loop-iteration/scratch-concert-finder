import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Search from '/client/components/Search.jsx'


const App = (props) => {

    return (
        <ChakraProvider>
            <Search />
        </ChakraProvider>
    );
}

export default App;