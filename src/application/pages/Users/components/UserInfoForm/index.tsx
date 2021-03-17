import React, { FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $userData,
  $usersError,
  $usersPending,
  changeForm,
  createUserFx,
  deleteUserFx, getUserDataFx,
} from "../../models/form";
import { Button, CustomSelect, FluidLabelInput } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { BgTypeEnum } from "ui/Button";
import { IUserData } from "../../types/UserData";
import "../../models/init";

function UserInfoForm() {
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const userData = useStore<IUserData | null>($userData);
  const error = useStore($usersError);
  const pending = useStore($usersPending);
  const formIsChanged = useStore($formIsChanged);
  const defaultValues = {
    company_id: null,
    name: null,
    login: null,
    role: null,
    is_active: null,
  };

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

  const resetForm = () => {
    reset(defaultValues);
  };

  const generatePassword = () => {
    setValue(
      "password",
      Math.floor(100000 + Math.random() * 900000).toString(),
      {
        shouldDirty: true,
        shouldValidate: true
      }
    );
  };

  const deleteUser = () => {
    return deleteUserFx(userData!.id);
  };

  const cancelForm = () => {
    resetForm();
    return getUserDataFx(null)
  }

  const onSubmit = (body: IUserData) => {
    console.log(body);
    createUserFx(body).then((response) => {
      if (response) {
        resetForm();
      }
    });
  };

  useEffect(() => {
    reset({
      company_id: userData?.id,
      name: userData?.name,
      login: userData?.login,
      role: {
        value: userData?.role.id,
        label: userData?.role.name,
      },
      is_active: userData?.is_active,
    });
  }, [reset, userData]);

  return (
    <>
      <h2>Информация пользователя</h2>
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
            id="name"
            name="name"
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
              id="login"
              name="login"
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
              id="role"
              name="role"
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
              type="text"
              id="password"
              name="password"
              placeholder="Пароль"
              required
              onIconClick={generatePassword}
              icon={
                <IcRefresh
                  className="text-primary hover:text-hover-primary"
                  title="Новый пароль"
                />
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
              id="is_active"
              name="is_active"
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
              icon={
                pending ? <IcLoader className="w-7 h-7 m-auto" /> : <IcDelete />
              }
              type="button"
              bgType={BgTypeEnum.warning}
              disabled={!userData || error !== null || pending}
              className="w-full"
              onButtonClick={deleteUser}
            />
          </div>
          <div className="mx-2.5 flex-auto">
            <Button
              value="Отменить"
              type="button"
              bgType={BgTypeEnum.secondary}
              disabled={error !== null || pending}
              className="w-full"
              onButtonClick={cancelForm}
            />
          </div>
          <div className="mx-2.5 flex-auto">{submitButtonRender}</div>
        </div>
      </form>
    </>
  );
}

export default UserInfoForm;
