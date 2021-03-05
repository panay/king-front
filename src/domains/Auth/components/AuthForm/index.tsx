import "infrastructure/models/auth/init";
import "../../models/init";

import {FluidLabelInput, Button} from "ui";
import { ReactComponent as IcInvisib } from "infrastructure/assets/images/svgs/ic-invisib.svg";
import { ReactComponent as IcVision } from "infrastructure/assets/images/svgs/ic-vision.svg";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ILoginRequest, loginFx } from "infrastructure/models/auth/login";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $loginError,
  $loginPending,
  changeForm,
} from "../../models";

function AuthForm() {
  const [passwordHidden, togglePasswordHidden] = useState(true);
  const [buttonValue, changeButtonValue] = useState("Войти");
  const [buttonDisabled, changeButtonDisabled] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const error = useStore($loginError);
  const pending = useStore($loginPending);
  const formIsChanged = useStore($formIsChanged);
  const handleChangeForm = changeForm.prepend((e: FormEvent) => true);

  const onSubmit = (body: ILoginRequest) => loginFx(body);

  useEffect(() => {
    changeButtonValue(
      pending
        ? "Ожидайте"
        : Object.keys(error).length > 0
        ? error.message
        : "Войти"
    );

    changeButtonDisabled(
      () => !isValid || Object.keys(error).length > 0 || pending
    );
  }, [isValid, pending, error]);

  return (
    <>
      <h1>Авторизация</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={!formIsChanged ? handleChangeForm : undefined}
      >
        <div className="mt-6">
          <FluidLabelInput
            inputRef={register({
              required: true,
              // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            type="text"
            id="login"
            name="login"
            placeholder="Почта"
            required
          />
        </div>
        <div className="mt-4">
          <FluidLabelInput
            inputRef={register({
              required: true,
            })}
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
                  className="text-primary hover:text-hover-primary"
                  title="Показать пароль"
                />
              ) : (
                <IcVision
                  className="text-primary hover:text-hover-primary"
                  title="Спрятать пароль"
                />
              )
            }
          />
        </div>
        <div className="mt-4">
          <Button
            value={buttonValue || "Войти"}
            type="submit"
            disabled={buttonDisabled || false}
            className="w-full"
          />
        </div>
      </form>
    </>
  );
}

export default AuthForm;
