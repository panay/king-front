import React  from "react";
import { useForm } from "react-hook-form";

function UserInfoForm({ userData }: { userData: unknown }) {
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
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </>
  );
}

export default UserInfoForm;
