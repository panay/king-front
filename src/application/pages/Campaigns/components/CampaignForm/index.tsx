import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  ConfirmPanel,
  CustomSelect,
  FluidLabelInput,
  FormErrorMessage,
} from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";
import { ReactComponent as IcDelete } from "infrastructure/assets/images/svgs/ic-delete.svg";
import { ReactComponent as IcIOS } from "infrastructure/assets/images/svgs/ic-apple.svg";
import { ReactComponent as IcAndroid } from "infrastructure/assets/images/svgs/ic-android.svg";
import { BgTypeEnum } from "ui/Button";
import { useStore } from "effector-react";
import { $currentCompany } from "infrastructure/models/auth/user";
import {
  $campaignData,
  $campaignError,
  $campaignPending,
  $formIsChanged,
  changeForm,
  createCampaignFx,
  deleteCampaignFx,
  resetCampaignData,
  resetErrorForm,
  updateCampaignFx,
} from "../../models/form";
import { changeCampaigns } from "../../models/table";
import UserContext from "infrastructure/context/UserContext";
import PeriodDatepicker from "../PeriodDatepicker";
import LocationsList from "../LocationsList";
import MaskedInput from "react-text-mask";
import GeofenceList from "../GeofenceList";
import { ReactComponent as IcVision } from "infrastructure/assets/images/svgs/ic-vision.svg";

function CampaignForm() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    control,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const { isValid, isDirty } = formState;

  const user = useContext(UserContext);

  const [readyToDelete, confirmToDelete] = useState(false);
  const [formIsEmpty, emptyForm] = useState(true);

  const error = useStore($campaignError);
  const pending = useStore($campaignPending);
  const formIsChanged = useStore($formIsChanged);
  const currentCompany = useStore($currentCompany);
  const campaign = useStore($campaignData);

  const daysOfWeekOptions = [
    {
      value: "1",
      label: "Понедельник",
    },
    {
      value: "2",
      label: "Вторник",
    },
    {
      value: "3",
      label: "Среда",
    },
    {
      value: "4",
      label: "Четверг",
    },
    {
      value: "5",
      label: "Пятница",
    },
    {
      value: "6",
      label: "Суббота",
    },
    {
      value: "7",
      label: "Воскресенье",
    },
  ];

  const notifiesFrequency = [
    {
      value: "10",
      label: "10 минут",
    },
    {
      value: "20",
      label: "20 минут",
    },
    {
      value: "30",
      label: "30 минут",
    },
    {
      value: "40",
      label: "40 минут",
    },
    {
      value: "50",
      label: "50 минут",
    },
    {
      value: "60",
      label: "60 минут",
    },
  ];

  const actionOptions = [
    {
      value: "in_action",
      label: "Вход в зону",
    },
    {
      value: "out_action",
      label: "Выход из зоны",
    },
  ];

  const defaultValues = {
    company_id: currentCompany?.id,
    days_of_week: [],
    geofence_ids: [],
    action: {
      in_action: {
        subtitle: null,
        text: null,
        title: null,
      },
      out_action: {
        subtitle: null,
        text: null,
        title: null,
      },
    },
    location_id: null,
    max_notify_count_per_day: null,
    name: null,
    notifies_frequency: null,
    period: {
      end_date: null,
      end_time_per_day: null,
      start_date: null,
      start_time_per_day: null,
    },
    platforms: [],
  };

  const resetForm = () => {
    reset(defaultValues);
    resetErrorForm();
  };

  const deleteCampaign = () => {
    confirmToDelete(false);

    deleteCampaignFx(currentCompany!.id).then((response) => {
      if (response) {
        cancelForm();
      }

      changeCampaigns(true);
    });
  };

  const cancelForm = () => {
    resetCampaignData();
    resetForm();
    emptyForm(true);
  };

  const handleChangeForm = () => {
    emptyForm(false);
    return !formIsChanged
      ? changeForm?.prepend((e: FormEvent) => true)
      : undefined;
  };

  const onSubmit = (formData: any) => {
    const body = {
      ...defaultValues,
      ...formData,
    };
    debugger;

    if (currentCompany?.id) {
      updateCampaignFx(body).then((response) => {
        if (response) {
          cancelForm();
        }

        changeCampaigns(true);
      });
    } else {
      createCampaignFx(body).then((response) => {
        if (response) {
          cancelForm();
        }

        changeCampaigns(true);
      });
    }
  };

  const submitButtonRender = pending ? (
    <Button
      icon={<IcLoader className="w-7 h-7 m-auto" />}
      type="submit"
      disabled={!isDirty || !isValid || pending}
      className="w-full"
    />
  ) : (
    <Button
      value={campaign ? "Сохранить" : "Добавить"}
      type="submit"
      disabled={!isDirty || !isValid || pending}
      className="w-full"
    />
  );

  const buttonsPanelRender = readyToDelete ? (
    <ConfirmPanel
      message="Вы уверены, что хотите удалить кампанию из&nbsp;списка?"
      confirmed={(isConfirmed) =>
        isConfirmed ? deleteCampaign() : confirmToDelete(false)
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
          disabled={!campaign || pending}
          className="w-full"
          onButtonClick={() => confirmToDelete(true)}
        />
      </div>
      <div className="mx-2.5 flex-auto">
        <Button
          value="Отменить"
          type="button"
          bgType={BgTypeEnum.secondary}
          disabled={formIsEmpty || pending}
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

  const handleActionTypeChanged = (value: any) => {
    debugger;
    // setValue(value.value, {});
  };

  const handleActionChanged = (value: any) => {
    debugger;
    // setValue(value.value, value.label);
  };

  useEffect(() => {
    reset({
      days_of_week: null,
      geofence_ids: [],
      action: [
        {
          in_action: campaign?.in_action,
        },
        {
          out_action: campaign?.out_action,
        },
      ],
      location_id: campaign?.location?.id,
      max_notify_count_per_day: campaign?.max_notify_count_per_day,
      name: campaign?.name,
      notifies_frequency: null,
      period: campaign?.period,
      platforms: campaign?.platforms,
      id: campaign?.id,
    });

    emptyForm(!campaign);

    resetErrorForm();

    if (!user) {
      cancelForm();
    }
  }, [reset, campaign, user]);

  return (
    <>
      <h2>{campaign ? "Редактирование кампании" : "Создание кампании"} </h2>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleChangeForm}>
        <div className="mt-4">
          <FluidLabelInput
            inputRef={register({
              required: true,
            })}
            type="text"
            id="name"
            name="name"
            placeholder="Название кампании"
            required
          />
        </div>
        <div className="mt-4 -mx-2.5 flex items-center">
          <div className="flex-1 mx-2.5 relative z-20">
            <Controller
              name="start_date"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={campaign?.period?.start_date || null}
              render={(props) => (
                <PeriodDatepicker
                  inputRef={register({
                    required: true,
                  })}
                  field="start_date"
                  placeholder="Дата начала"
                  onChange={props.onChange}
                />
              )}
            />
          </div>
          <div className="flex-1 mx-2.5 relative z-20">
            <Controller
              name="end_date"
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={campaign?.period?.end_date || null}
              render={(props) => (
                <PeriodDatepicker
                  inputRef={register({
                    required: true,
                  })}
                  field="end_date"
                  placeholder="Дата завершения"
                  onChange={props.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-4">
          <Controller
            name="days_of_week"
            control={control}
            rules={{ required: true, setValueAs: (value) => value?.value }}
            render={(props) => (
              <CustomSelect
                placeholder="Выберите определеный день в периоде"
                name="days_of_week"
                value={props.value}
                isMulti={true as any}
                isSearchable={false}
                options={daysOfWeekOptions}
                isClearable={false}
                closeMenuOnSelect={false}
                onChange={(e) => props.onChange(e)}
              />
            )}
          />
        </div>
        <div className="mt-4 -mx-2.5 flex items-center">
          <div className="flex-1 mx-2.5">
            <Controller
              name="start_time_per_day"
              control={control}
              rules={{ required: true }}
              defaultValue={campaign?.period?.start_date || null}
              render={(props) => (
                <MaskedInput
                  mask={[/\d/, /\d/, ":", /\d/, /\d/]}
                  id="start_time_per_day"
                  render={(ref: any, props: any) => (
                    <FluidLabelInput
                      inputRef={ref}
                      {...props}
                      type="text"
                      id="start_time_per_day"
                      name="start_time_per_day"
                      placeholder="Время начала (по МСК)"
                      required
                    />
                  )}
                />
              )}
            />
          </div>
          <div className="flex-1 mx-2.5">
            <Controller
              name="end_time_per_day"
              control={control}
              rules={{ required: true }}
              defaultValue={campaign?.period?.start_date || null}
              render={(props) => (
                <MaskedInput
                  mask={[/\d/, /\d/, ":", /\d/, /\d/]}
                  id="end_time_per_day"
                  render={(ref: any, props: any) => (
                    <FluidLabelInput
                      inputRef={ref}
                      {...props}
                      type="text"
                      id="end_time_per_day"
                      name="end_time_per_day"
                      placeholder="Время завершения (по МСК)"
                      required
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-4 -mx-2.5 flex items-center">
          <div className="flex-1 mx-2.5">
            <FluidLabelInput
              inputRef={register({
                required: true,
              })}
              type="number"
              min="0"
              id="max_notify_count_per_day"
              name="max_notify_count_per_day"
              placeholder="Кол-во push уведомлений"
              required
            />
          </div>
          <div className="flex-1 mx-2.5">
            <span className="text-icon-grey text-xs">
              0 — неограниченное кол-во
            </span>
          </div>
        </div>
        <div className="mt-4 -mx-2.5 flex items-center">
          <div className="flex-1 mx-2.5">
            <h3>Мобильные платформы</h3>
            <div className="-mx-2.5 flex items-center">
              {["ios", "android"].map((c, i) => (
                <div className="mx-2.5" key={c}>
                  <Checkbox
                    name="platforms"
                    value={c}
                    icon={c === "ios" ? <IcIOS /> : <IcAndroid />}
                    inputRef={register}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 mx-2.5">
            <Controller
              name="notifies_frequency"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={(props) => (
                <CustomSelect
                  placeholder="Периодичность"
                  isSearchable={false}
                  name="notifies_frequency"
                  options={notifiesFrequency}
                  value={props.value}
                  onChange={(e) => props.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-4 -mx-2.5 flex items-center">
          <div className="flex-1 mx-2.5">
            <Controller
              name="location_id"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={(props) => (
                <LocationsList
                  inputRef={props.ref}
                  field="location_id"
                  onChange={props.onChange}
                />
              )}
            />
          </div>
          <div className="flex-1 mx-2.5">
            <Controller
              name="geofence_ids"
              control={control}
              rules={{ required: true }}
              defaultValue={[]}
              render={(props) => (
                <GeofenceList
                  inputRef={props.ref}
                  field="geofence_ids"
                  onChange={props.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-4 -mx-2.5 flex items-center">
          <div className="flex-1 mx-2.5">
            <Controller
              name="action"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={(props) => (
                <CustomSelect
                  inputRef={props.ref}
                  placeholder="Тип события"
                  isSearchable={false}
                  name="action"
                  options={actionOptions}
                  onChange={(e) => {
                    debugger;
                    props.onChange({
                      [e!.value]: {},
                    });
                  }}
                />
              )}
            />
          </div>
          <div className="flex-1 mx-2.5">
            <Controller
              name="action"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={(props) => (
                <CustomSelect
                  inputRef={props.ref}
                  placeholder="Действие для кампании"
                  isSearchable={false}
                  name="action"
                  options={[
                    {
                      value: "message",
                      label: "Сообщение",
                    },
                  ]}
                  onChange={(e) => {
                    debugger;
                    props.onChange({
                      [e!.value]: {},
                    });
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-4 bg-input-grey rounded-lg">
          <div>
            <FluidLabelInput placeholder="Напишите заголовок" />
          </div>
          <div>
            <FluidLabelInput placeholder="Напишите подзаголовок" />
          </div>
          <div>
            <FluidLabelInput placeholder="Текст уведомления для кампании" />
          </div>
          <div className="flex items-center pb-4 hover:cursor-pointer">
            <span className="mr-2 pl-3">
              <IcVision className="text-primary hover:text-hover-primary" />
            </span>
            <span className="font-semibold text-icon-grey">Посмотреть</span>
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

export default CampaignForm;
