import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { ContextProvider } from './Context/context';  // Import ContextProvider
import Main from './components/Main/Main';

const App = () => {
  return (
    <ContextProvider>   {/* Wrap Sidebar with ContextProvider */}
      <Sidebar />
      <Main/>
    </ContextProvider>
    
  );
};

export default App;