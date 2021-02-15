import React, { useState } from "react";
import RecoveryPassword from "./components/RecoveryForm";
import AuthForm from "./components/AuthForm";
import AuthFooter from "./components/AuthFooter";

function Auth() {
  const [recovery, toggleRecoveryMode] = useState(false);

  const handleRecoveryMode = (mode: boolean) => {
    toggleRecoveryMode(mode);
  };

  return (
    <div className="bg-white rounded-md max-w-full w-1/4 mt-10 p-6 text-center">
      {recovery ? <RecoveryPassword phone="+7 (999) 123–45–67" /> : <AuthForm />}
      <AuthFooter recovery={recovery} onClick={handleRecoveryMode} />
    </div>
  );
}

export default Auth;
