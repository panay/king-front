import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../../infrastructure/assets/images/svgs/logo.svg";
import { ReactComponent as IcVision } from "../../../infrastructure/assets/images/svgs/ic-vision.svg";
import { ReactComponent as IcInvisib } from "../../../infrastructure/assets/images/svgs/ic-invisib.svg";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";

function Login() {
  useEffect(() => {
    document.title = "Авторизация – Spark [radar]";
  });

  const [passwordHidden, togglePasswordHidden] = useState(true);

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    console.log("вошь :: ", event.target);
  };

  return (
    <div className="bg-primary flex flex-col items-center justify-center p-3 h-full">
      <Logo className="text-white" />
      <form onSubmit={handleSubmitForm} className="bg-white rounded-md max-w-full w-1/4 mt-11 p-6 text-center">
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
            type={passwordHidden ? "password" : "text"}
            id="password"
            name="password"
            placeholder="Пароль"
            required
            onIconClick={() =>
              togglePasswordHidden((passwordHidden) => !passwordHidden)
            }
            icon={
              passwordHidden ? (
                <IcInvisib
                  className="text-primary hover:text-dusty-orange"
                  title="Показать пароль"
                />
              ) : (
                <IcVision
                  className="text-primary hover:text-dusty-orange"
                  title="Спрятать пароль"
                />
              )
            }
          />
        </div>
        <div className="mt-4">
          <Button value="Войти" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
