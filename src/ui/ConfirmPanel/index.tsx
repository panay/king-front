import React from "react";
import { BgTypeEnum } from "ui/Button";
import { Button } from "ui";

type Props = {
  message: string;
  confirmed: (isConfirmed: boolean) => void;
};

function ConfirmPanel({ confirmed, message }: Props) {
  return (
    <div className="bg-lighten-grey rounded-xl border border-border-grey px-4 pt-4 pb-1.5 text-center">
      <h3>{message}</h3>
      <div className="flex justify-center items-center">
        <Button
          value="Нет"
          type="button"
          bgType={BgTypeEnum.none}
          className="w-1/4"
          onButtonClick={() => confirmed(false)}
        />
        <Button
          value="Да"
          type="button"
          bgType={BgTypeEnum.none}
          className="w-1/4"
          onButtonClick={() => confirmed(true)}
        />
      </div>
    </div>
  );
}

export default ConfirmPanel;
