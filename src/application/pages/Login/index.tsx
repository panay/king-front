import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../../../infrastructure/assets/images/svgs/logo.svg";
import { ReactComponent as IcVision } from "../../../infrastructure/assets/images/svgs/ic-vision.svg";
import Input from "../../../ui/Input";

function Login() {
  useEffect(() => {
    document.title = "Авторизация – Spark[radar]";
  });

  return (
    <div className="bg-primary flex flex-col items-center justify-center p-3 h-full">
      <Logo className="text-white" />
      <div className="bg-white rounded-md max-w-full w-1/4 mt-11 p-6 text-center">
        <h1>Авторизация</h1>
        <div className="mt-4">
          <Input
            type="text"
            id="email"
            name="email"
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="Почта"
            required
          />
        </div>
        <div className="mt-4">
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            required
            icon={<IcVision className="text-primary" />}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
