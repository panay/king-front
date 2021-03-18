import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $roles,
  $userData,
  $usersError,
  $usersPending,
  changeForm,
  createUserFx,
  deleteUserForm,
  resetUserData,
} from "../../models/form";
import { Button, CustomSelect, FluidLabelInput } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { BgTypeEnum } from "ui/Button";
import { IUserData } from "../../types/UserData";
import "../../models/init";
import ConfirmPanel from "../ConfirmPanel";
import { IKeyValue } from "infrastructure/types";

function UserInfoForm() {
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    mode: "onChange",
  });
  const { isValid, isDirty } = formState;

  const [readyToDelete, confirmToDelete] = useState(false);
  const userData = useStore<IUserData | null>($userData);
  const roles = useStore<IKeyValue[]>($roles);
  const error = useStore($usersError);
  const pending = useStore($usersPending);
  const formIsChanged = useStore($formIsChanged);
  const defaultValues = {
    id: null,
    name: null,
    login: null,
    role: null,
    is_active: null,
  };
  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const isActiveOptions = [
    {
      value: "1",
      label: "Активен",
    },
    {
      value: "0",
      label: "Не активен",
    },
  ];

  const roleValue =
    roleOptions.find((option) => userData?.role.id === option.value) || null;

  const isActiveValue = isActiveOptions.find((option) =>
      userData?.is_active
          ? option.value === "1"
          : option.value === "0"
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
        shouldValidate: true,
      }
    );
  };

  const deleteUser = () => {
    confirmToDelete(false);
    deleteUserForm(userData!.id);
  };

  const cancelForm = () => {
    resetUserData();
    resetForm();
  };

  const onSubmit = (body: any) => {
    console.log(body);

    createUserFx(body).then((response) => {
      if (response) {
        resetForm();
      }
    });
  };

  const submitButtonRender = pending ? (
    <Button
      icon={<IcLoader className="w-7 h-7 m-auto" />}
      type="submit"
      disabled={!isDirty || !isValid || error !== null || pending}
      className="w-full"
    />
  ) : (
    <Button
      value={userData ? "Сохранить" : "Добавить"}
      type="submit"
      disabled={!isDirty || !isValid || error !== null || pending}
      className="w-full"
    />
  );

  const buttonsPanelRender = readyToDelete ? (
    <ConfirmPanel
      confirmed={(isConfirmed) =>
        isConfirmed ? deleteUser() : confirmToDelete(false)
      }
    />
  ) : (
    <>
      <div className="mx-2.5 flex-auto">
        <Button
          icon={
            pending ? <IcLoader className="w-7 h-7 m-auto" /> : <IcDelete />
          }
          type="button"
          bgType={BgTypeEnum.warning}
          disabled={!userData || error !== null || pending}
          className="w-full"
          onButtonClick={() => confirmToDelete(true)}
        />
      </div>
      <div className="mx-2.5 flex-auto">
        <Button
          value="Отменить"
          type="button"
          bgType={BgTypeEnum.secondary}
          disabled={pending}
          className="w-full"
          onButtonClick={cancelForm}
        />
      </div>
      <div className="mx-2.5 flex-auto">{submitButtonRender}</div>
    </>
  );

  useEffect(() => {
    reset({
      id: userData?.id,
      name: userData?.name,
      login: userData?.login,
      role: userData
        ? {
            value: userData.role.id,
            label: userData.role.name,
          }
        : null,
      is_active: {
        value: userData?.is_active ? "1" : "0",
        label: userData?.is_active ? "Активен" : "Не активен",
      },
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
              required
              value={roleValue}
              options={roleOptions}
            />
          </div>
        </div>

        <div className="mt-4 -mx-2.5 flex">
          <div className="flex-1 mx-2.5">
            <FluidLabelInput
              inputRef={register({
                required: !userData,
              })}
              type="text"
              id="password"
              name="password"
              placeholder="Пароль"
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
              required
              value={isActiveValue}
              options={isActiveOptions}
            />
          </div>
        </div>
        <div className="mt-6 -mx-2.5 flex items-center">
          {buttonsPanelRender}
        </div>
      </form>
    </>
  );
}

export default UserInfoForm;
