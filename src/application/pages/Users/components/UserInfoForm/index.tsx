import React, {FormEvent, useState} from "react";
import { useForm } from "react-hook-form";
import {useStore} from "effector-react";
import {$formIsChanged, $usersError, $usersPending, changeForm } from "../../models";

function UserInfoForm({ userData }: { userData: unknown }) {
  const [buttonValue, changeButtonValue] = useState("Войти");
  const [buttonDisabled, changeButtonDisabled] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const error = useStore($usersError);
  const pending = useStore($usersPending);
  const formIsChanged = useStore($formIsChanged);
  const handleChangeForm = changeForm.prepend((e: FormEvent) => true);

  const onSubmit = (body: any) => {
    console.log(body)
  }

  return (
    <>
      <h2>Информация пользователя </h2>
      <form onSubmit={handleSubmit(onSubmit)}>

      </form>
    </>
  );
}

export default UserInfoForm;
