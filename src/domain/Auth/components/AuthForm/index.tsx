import Input from "../../../../ui/Input";
import { ReactComponent as IcInvisib } from "../../../../infrastructure/assets/images/svgs/ic-invisib.svg";
import { ReactComponent as IcVision } from "../../../../infrastructure/assets/images/svgs/ic-vision.svg";
import Button from "../../../../ui/Button";
import React, { useState } from "react";

function AuthForm() {
  const [passwordHidden, togglePasswordHidden] = useState(true);

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    console.log("authForm :: ", event.target);
  };

  return (
    <>
      <h1>Авторизация</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="mt-6">
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
    </>
  );
}

export default AuthForm;
