import React from "react";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { useForm } from "react-hook-form";

function UserInfoForm() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;
  const onSubmit = (body: any) => {
    console.log("users on submit");
  };
  return (
    <>
      <h2>Информация пользователя </h2>
      <form onSubmit={handleSubmit(onSubmit)}>

      </form>
    </>
  );
}

export default UserInfoForm;
