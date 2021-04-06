import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import {
  $formIsChanged,
  $locationData,
  $locationError,
  $locationPending,
  changeForm,
  createLocationFx,
  deleteLocationFx,
  resetErrorForm,
  resetLocationData,
  updateLocationFx,
} from "../../models/form";
import { Button, ConfirmPanel, FluidLabelInput, FormErrorMessage } from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { BgTypeEnum } from "ui/Button";
import "../../models/init";
import { IKeyValue } from "infrastructure/types";
import { $currentCompany } from "infrastructure/models/auth/user";
import { ILocationData } from "../../types/LocationData";

function LocationInfoForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });
  const { isValid, isDirty } = formState;

  const [readyToDelete, confirmToDelete] = useState(false);
  const locationData = useStore<IKeyValue | null>($locationData);
  const error = useStore($locationError);
  const pending = useStore($locationPending);
  const formIsChanged = useStore($formIsChanged);
  const currentCompany = useStore($currentCompany);

  const defaultValues = {
    id: locationData?.id,
    name: null,
  };

  const resetForm = () => {
    reset(defaultValues);
    resetErrorForm();
  };

  const deleteLocation = () => {
    confirmToDelete(false);
    deleteLocationFx(locationData!.id).then((response) => {
      if (response) {
        cancelForm();
      }
    });
  };

  const cancelForm = () => {
    resetLocationData();
    resetForm();
  };

  const handleChangeForm = () => {
    return !formIsChanged
      ? changeForm?.prepend((e: FormEvent) => true)
      : undefined;
  };

  const onSubmit = (formData: IKeyValue) => {
    const body: ILocationData = {
      ...defaultValues,
      ...formData,
      company_id: currentCompany?.id,
    };

    if (locationData?.id) {
      updateLocationFx(body).then((response) => {
        if (response) {
          cancelForm();
        }
      });
    } else {
      createLocationFx(body).then((response) => {
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
      value={locationData ? "Сохранить" : "Добавить"}
      type="submit"
      disabled={!isDirty || !isValid || error !== null || pending}
      className="w-full"
    />
  );

  const buttonsPanelRender = readyToDelete ? (
    <ConfirmPanel
      message="Вы уверены, что хотите удалить местоположение из&nbsp;списка?"
      confirmed={(isConfirmed) =>
        isConfirmed ? deleteLocation() : confirmToDelete(false)
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
          disabled={!locationData || error !== null || pending}
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
      id: locationData?.id,
      name: locationData?.name,
    });

    resetErrorForm();
  }, [reset, locationData]);

  return (
    <>
      <h2>
        {locationData?.id
          ? "Изменение местоположения"
          : "Добавление местоположения"}
      </h2>
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
        <div className="mt-6 -mx-2.5 flex items-center">
          {buttonsPanelRender}
        </div>
        {errorRender}
      </form>
    </>
  );
}

export default LocationInfoForm;
