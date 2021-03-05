import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $usersError,
  $usersPending,
  changeForm,
} from "../../models";
import { Button, FluidLabelInput } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcInvisib } from "infrastructure/assets/images/svgs/ic-invisib.svg";
import { ReactComponent as IcVision } from "infrastructure/assets/images/svgs/ic-vision.svg";

function UserInfoForm({ userData }: { userData: unknown }) {
  const [passwordHidden, togglePasswordHidden] = useState(true);
  const [buttonValue, changeButtonValue] = useState<string | ReactElement>(
    "Сохранить"
  );
  const [buttonDisabled, changeButtonDisabled] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const error = useStore($usersError);
  const pending = useStore($usersPending);
  const formIsChanged = useStore($formIsChanged);
  const handleChangeForm = changeForm.prepend((e: FormEvent) => true);

  useEffect(() => {
    changeButtonValue(pending ? <IcLoader /> : "Сохранить");

    changeButtonDisabled(
      () => !isValid || Object.keys(error).length > 0 || pending
    );
  }, [isValid, pending, error]);

  const onSubmit = (body: any) => {
    console.log(body);
  };

  return (
    <>
      <h2>Информация пользователя </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={!formIsChanged ? handleChangeForm : undefined}
      >
        <div className="mt-4">
          <FluidLabelInput
            inputRef={register({
              required: true,
            })}
            type="text"
            id="username"
            name="username"
            placeholder="Имя"
            required
          />
        </div>
        <div className="mt-4 -mx-2.5 flex">
          <div className="flex-auto mx-2.5">
            <FluidLabelInput
              inputRef={register({
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              type="text"
              id="email"
              name="email"
              placeholder="Почта"
              required
            />
          </div>
          <div className="flex-auto mx-2.5">
            <FluidLabelInput
              inputRef={register({
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              type="text"
              id="email"
              name="email"
              placeholder="Роль"
              required
            />
          </div>
        </div>

        <div className="mt-4 -mx-2.5 flex">
          <div className="flex-auto mx-2.5">
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
          <div className="flex-auto mx-2.5">
            <FluidLabelInput
              inputRef={register({
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              type="text"
              id="email"
              name="email"
              placeholder="Признак"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <Button
            icon={buttonValue as ReactElement}
            type="submit"
            disabled={buttonDisabled || false}
            className={`w-full ${!pending ? "py-3" : ""}`}
          />
        </div>
      </form>
    </>
  );
}

export default UserInfoForm;
