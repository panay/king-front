import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ConfirmPanel, FluidLabelInput, FormErrorMessage } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { BgTypeEnum } from "ui/Button";

function CampaignForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });
  const { isValid, isDirty } = formState;

  const [readyToDelete, confirmToDelete] = useState(false);
  const [formIsEmpty, emptyForm] = useState(true);

  // todo: set default values
  const defaultValues = {};

  return (
    <>
      <h2>Создание кампании</h2>
      <form>
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
        <div className="mt-6 -mx-2.5 flex items-center">
          {/*{buttonsPanelRender}*/}
        </div>
        {/*{errorRender}*/}
      </form>
    </>
  );
}

export default CampaignForm;
