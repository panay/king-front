import "infrastructure/models/auth/init";
import "../../models/init";

import { Button, FluidLabelInput } from "ui";
import { ReactComponent as IcInvisib } from "infrastructure/assets/images/svgs/ic-invisib.svg";
import { ReactComponent as IcVision } from "infrastructure/assets/images/svgs/ic-vision.svg";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import React, { FormEvent, useState } from "react";
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

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const error = useStore($loginError);
  const pending = useStore($loginPending);
  const formIsChanged = useStore($formIsChanged);
  const handleChangeForm = changeForm.prepend((e: FormEvent) => true);

  const submitButtonRender = pending ? (
    <Button
      icon={<IcLoader className="w-7 h-7 m-auto" />}
      type="submit"
      disabled={!isValid || error !== null || pending}
      className="w-full"
    />
  ) : (
    <Button
      value={error !== null ? error : "Войти"}
      type="submit"
      disabled={!isValid || error !== null || pending}
      className="w-full"
    />
  );

  const onSubmit = (body: ILoginRequest) => loginFx(body);

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
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
        <div className="mt-4">{submitButtonRender}</div>
      </form>
    </>
  );
}

export default AuthForm;
