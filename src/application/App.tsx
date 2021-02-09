import React from "react";
import { ReactComponent as Logo } from "../infrastructure/assets/images/svgs/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { RouterConfig } from "./routing/RouterConfig";

function App() {
  return (
    <div className="max-w-sm m-auto">
      <Logo className="text-button-link" />

      <Router>
        <RouterConfig />
      </Router>

      {/*<Button value="Применить" />*/}
    </div>
  );
}

export default App;
