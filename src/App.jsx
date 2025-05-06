import React from 'react';
import Sidebar from './components/Main/Sidebar/Sidebar';
import { ContextProvider } from './Context/context';  // Import ContextProvider
import Main from './components/main/Main';

const App = () => {
  return (
    <ContextProvider>   {/* Wrap Sidebar with ContextProvider */}
      <Sidebar />
      <Main/>
    </ContextProvider>
    
  );
};

export default App;
