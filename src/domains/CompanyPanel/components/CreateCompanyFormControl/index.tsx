import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "ui";
import { ReactComponent as IcPlus } from "infrastructure/assets/images/svgs/ic-plus.svg";
import { BgTypeEnum } from "ui/Button";
import {
  $companyError,
  $companyPending,
  $formIsChanged,
  changeForm,
  createNewCompanyFx,
} from "infrastructure/models/company";
import { useStore } from "effector-react";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";

function CreateCompanyFormControl() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const error = useStore($companyError);
  const pending = useStore($companyPending);
  const formIsChanged = useStore($formIsChanged);
  const handleChangeForm = changeForm.prepend((e: FormEvent) => true);

  const onSubmit = (body: { name: string }) => {
    createNewCompanyFx(body.name).then((response) => {
      if (response) {
        reset();
      }
    });
  };

  return (
    <form
      className="flex items-center font-normal -mx-2"
      onSubmit={handleSubmit(onSubmit)}
      onChange={!formIsChanged ? handleChangeForm : undefined}
    >
      <div className="mx-2">
        <Input
          inputRef={register({
            required: true,
          })}
          type="text"
          id="name"
          name="name"
          placeholder="Название компании"
          className={error ? "border-2 border-warning" : ""}
          required
        />
      </div>
      <div className="mx-2">
        <Button
          type="submit"
          bgType={BgTypeEnum.success}
          icon={pending ? <IcLoader className="w-4 h-4 m-auto" /> : <IcPlus />}
          disabled={!isValid || error || pending}
        />
      </div>
    </form>
  );
}

export default CreateCompanyFormControl;
