import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { UserProfileProvider } from './context/user-profile-context.jsx'; // 假设你把上面的代码放在 UserProfileContext.js 文件中

import Home from './pages/home/home';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <UserProfileProvider>
              <Home />
            </UserProfileProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  );
}
