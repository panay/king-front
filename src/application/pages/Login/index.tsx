import React, { useEffect } from "react";
import Auth from "../../../domain/Auth";
import { ReactComponent as Logo } from "../../../infrastructure/assets/images/svgs/logo.svg";

function Login() {
  useEffect(() => {
    document.title = "Авторизация – Spark [radar]";
  });

  return (
    <div className="bg-primary flex flex-col items-center justify-center p-3 h-full">
      <Logo className="text-white" />
      <Auth />
    </div>
  );
}

export default Login;
