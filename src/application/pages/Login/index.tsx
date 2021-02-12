import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../../../infrastructure/assets/images/svgs/logo.svg";

function Login() {
  useEffect(() => {
    document.title = "Авторизация – Spark[radar]";
  });
  return (
    <div className="bg-primary text-center flex flex-col items-center justify-center p-3 h-full">
      <Logo className="text-white" />
      <div className="bg-white rounded-md max-w-full w-1/4 mt-11 p-6">
        <h1>Авторизация</h1>
      </div>
    </div>
  );
}

export default Login;
