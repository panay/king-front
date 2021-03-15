import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $usersError,
  $usersPending,
  changeForm,
  createUserFx,
} from "../../models/form";
import { Button, CustomSelect, FluidLabelInput } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcInvisib } from "infrastructure/assets/images/svgs/ic-invisib.svg";
import { ReactComponent as IcVision } from "infrastructure/assets/images/svgs/ic-vision.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { BgTypeEnum } from "ui/Button";
import {IUserData} from "../../types/UserData";
import "../../models/form/init";

function UserInfoForm({ userData }: { userData: IUserData | null }) {
  const [passwordHidden, togglePasswordHidden] = useState(true);

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const error = useStore($usersError);
  const pending = useStore($usersPending);
  const formIsChanged = useStore($formIsChanged);

  const submitButtonRender = pending ? (
    <Button
      icon={<IcLoader className="w-7 h-7 m-auto" />}
      type="submit"
      disabled={!isValid || error !== null || pending}
      className="w-full"
    />
  ) : (
    <Button
      value={userData ? "Сохранить" : "Добавить"}
      type="submit"
      disabled={!isValid || error !== null || pending}
      className="w-full"
    />
  );

  const onSubmit = (body: IUserData) => {
    console.log(body);
    createUserFx(body).then((response) => {
      if (response) {
        reset();
      }
    });
  };

  return (
    <>
      <h2>Информация пользователя </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={
          !formIsChanged
            ? changeForm?.prepend((e: FormEvent) => true)
            : undefined
        }
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
          <div className="flex-1 mx-2.5">
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
          <div className="flex-1 mx-2.5">
            <CustomSelect
                placeholder="Роль"
                inputRef={register({
                  required: true,
                })}
                isSearchable={false}
                options={[
                  {
                    value: "1",
                    label: "Активен",
                  },
                  {
                    value: "0",
                    label: "Не активен",
                  },
                ]}
            />
          </div>
        </div>

        <div className="mt-4 -mx-2.5 flex">
          <div className="flex-1 mx-2.5">
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
          <div className="flex-1 mx-2.5">
            <CustomSelect
              placeholder="Признак"
              inputRef={register({
                required: true,
              })}
              isSearchable={false}
              options={[
                {
                  value: "1",
                  label: "Активен",
                },
                {
                  value: "0",
                  label: "Не активен",
                },
              ]}
            />
          </div>
        </div>
        <div className="mt-6 -mx-2.5 flex items-center">
          <div className="mx-2.5 flex-auto">
            <Button
              icon={<IcDelete />}
              type="button"
              bgType={BgTypeEnum.warning}
              disabled={!isValid || error !== null || pending}
              className="w-full"
            />
          </div>
          <div className="mx-2.5 flex-auto">
            <Button
              value="Отменить"
              type="button"
              bgType={BgTypeEnum.secondary}
              disabled={!isValid || error !== null || pending}
              className="w-full"
            />
          </div>
          <div className="mx-2.5 flex-auto">{submitButtonRender}</div>
        </div>
      </form>
    </>
  );
}

export default UserInfoForm;
