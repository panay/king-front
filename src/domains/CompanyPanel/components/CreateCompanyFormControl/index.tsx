import React from "react";
import {useForm} from "react-hook-form";
import {Button, Input} from "ui";
import {ReactComponent as IcPlus} from "infrastructure/assets/images/svgs/ic-plus.svg";
import {BgTypeEnum} from "ui/Button";

type Props = {
  onCreate: (name: string) => void;
};

function CreateCompanyFormControl({ onCreate }: Props) {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;
  const onSubmit = (body: { name: string }) => {
    debugger;
    onCreate(body.name);
  };

  return (
    <form
      className="flex items-center font-normal"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        inputRef={register({
          required: true,
        })}
        type="text"
        id="name"
        name="name"
        placeholder="Название компании"
        className="mr-3"
        required
      />
      <Button
        type="submit"
        bgType={BgTypeEnum.success}
        icon={<IcPlus />}
        disabled={!isValid}
      />
    </form>
  );
}

export default CreateCompanyFormControl;
