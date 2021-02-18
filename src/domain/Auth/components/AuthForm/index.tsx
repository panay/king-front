import Input from "ui/Input";
import { ReactComponent as IcInvisib } from "infrastructure/assets/images/svgs/ic-invisib.svg";
import { ReactComponent as IcVision } from "infrastructure/assets/images/svgs/ic-vision.svg";
import Button from "ui/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {ILoginRequest, submitFx} from "infrastructure/models/auth/login";
import "infrastructure/models/auth/init";

function AuthForm() {
  const [passwordHidden, togglePasswordHidden] = useState(true);
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const onSubmit = (body: ILoginRequest) => submitFx(body);

  return (
    <>
      <h1>Авторизация</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <Input
            inputRef={register({
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
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
            inputRef={register({
              required: true,
            })}
            type={passwordHidden ? "password" : "text"}
            id="pass"
            name="pass"
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
          <Button value="Войти" type="submit" disabled={!isValid} />
        </div>
      </form>
    </>
  );
}

export default AuthForm;
