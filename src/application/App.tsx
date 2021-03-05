import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RouterConfig } from "./routing/RouterConfig";
import { AuthProvider } from "infrastructure/context/AuthContext";
import { UserProvider } from "infrastructure/context/UserContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <RouterConfig />
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
