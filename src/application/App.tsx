import React from 'react';
import Button from "../ui/Button";
import {ReactComponent as Logo} from "../infrastructure/assets/images/svgs/logo.svg";

function App() {
  return (
    <div className="max-w-sm m-auto">
        <Logo className="text-blue-500"/>
      <Button value="Применить" />
    </div>
  );
}

export default App;
