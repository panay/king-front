import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "ui";
import { ReactComponent as IcPlus } from "infrastructure/assets/images/svgs/ic-plus.svg";
import { BgTypeEnum } from "ui/Button";

type Props = {
  onCreate: (name: string) => void;
};

function CreateCompanyFormControl({ onCreate }: Props) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;
  const onSubmit = (body: { name: string }) => onCreate(body.name);

  return (
    <form
      className="flex items-center font-normal -mx-2"
      onSubmit={handleSubmit(onSubmit)}
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
          required
        />
      </div>
      <div className="mx-2">
        <Button
          type="submit"
          bgType={BgTypeEnum.success}
          icon={<IcPlus />}
          disabled={!isValid}
        />
      </div>
    </form>
  );
}

export default CreateCompanyFormControl;
