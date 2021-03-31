import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $roles,
  $userData,
  $userError,
  $userPending,
  changeForm,
  createUserFx,
  deleteUserFx,
  resetErrorForm,
  resetUserData,
  updateUserFx,
} from "../../models/form";
import { Button, CustomSelect, FluidLabelInput, FormErrorMessage } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { BgTypeEnum } from "ui/Button";
import { IUserData } from "../../types/UserData";
import "../../models/init";
import ConfirmPanel from "../ConfirmPanel";
import { IKeyValue } from "infrastructure/types";
import UserContext from "infrastructure/context/UserContext";

function UserInfoForm() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    control,
  } = useForm({
    mode: "onChange",
  });
  const { isValid, isDirty } = formState;

  const user = useContext(UserContext);
  const [readyToDelete, confirmToDelete] = useState(false);
  const userData = useStore<IUserData | null>($userData);
  const roles = useStore<IKeyValue[]>($roles);
  const error = useStore($userError);
  const pending = useStore($userPending);
  const formIsChanged = useStore($formIsChanged);

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
    roleOptions.find((option) => userData?.role.id === option.value) ||
    roleOptions[0];

  const isActiveValue = isActiveOptions.find((option) =>
    userData?.is_active ? option.value === "1" : option.value === "0"
  );

  const defaultValues = {
    id: userData?.id,
    company_id: user?.company.id,
    name: null,
    login: null,
    role_id: null,
    is_active: isActiveValue,
    password: null
  };

  const resetForm = () => {
    reset(defaultValues);
    resetErrorForm();
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
    deleteUserFx(userData!.id).then((response) => {
      if (response) {
        cancelForm();
      }
    });
  };

  const cancelForm = () => {
    resetUserData();
    resetForm();
  };

  const handleChangeForm = () => {
    return !formIsChanged
      ? changeForm?.prepend((e: FormEvent) => true)
      : undefined;
  };

  const onSubmit = (formData: any) => {
    const body = {
      ...defaultValues,
      ...formData,
      password: userData?.id && !formData.password ? null : formData.password
    };

    if (userData?.id) {
      updateUserFx(body).then((response) => {
        if (response) {
          cancelForm();
        }
      });
    } else {
      createUserFx(body).then((response) => {
        if (response) {
          cancelForm();
        }
      });
    }
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

  const errorRender = error && (
    <div className="mt-10">
      <FormErrorMessage message={error} />
    </div>
  );

  useEffect(() => {
    reset({
      id: userData?.id,
      name: userData?.name,
      login: userData?.login,
      role_id: userData
        ? {
            value: userData.role.id,
            label: userData.role.name,
          }
        : null,
      password: null,
      is_active: {
        value: userData?.is_active ? "1" : "0",
        label: userData?.is_active ? "Активен" : "Не активен",
      },
    });

    resetErrorForm();
  }, [reset, userData]);

  return (
    <>
      <h2>Информация пользователя</h2>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChangeForm}>
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
                pattern: /^[\w\d._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              type="text"
              id="login"
              name="login"
              placeholder="Почта"
              required
              pattern="^[\w\d._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
          <div className="flex-1 mx-2.5">
            <Controller
              name="role_id"
              control={control}
              defaultValue={roleValue}
              rules={{ required: true, setValueAs: (value) => value?.value }}
              render={(props) => (
                <CustomSelect
                  placeholder="Роль"
                  name="role_id"
                  defaultValue={roleValue}
                  value={props.value}
                  isSearchable={false}
                  options={roleOptions}
                  onChange={(e) => props.onChange(e)}
                />
              )}
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
            <Controller
              name="is_active"
              control={control}
              defaultValue={isActiveValue}
              rules={{ required: true, setValueAs: (value) => +value?.value }}
              render={(props) => (
                <CustomSelect
                  placeholder="Признак"
                  isSearchable={false}
                  name="is_active"
                  defaultValue={isActiveValue}
                  options={isActiveOptions}
                  value={props.value}
                  onChange={(e) => props.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-6 -mx-2.5 flex items-center">
          {buttonsPanelRender}
        </div>
        {errorRender}
      </form>
    </>
  );
}

export default UserInfoForm;
