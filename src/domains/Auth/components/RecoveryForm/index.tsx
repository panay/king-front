import React from "react";
import { ReactComponent as IcPhone } from "infrastructure/assets/images/svgs/ic-phone.svg";

function RecoveryPassword({ phone }: { phone: string }) {
  return (
    <>
      <h1>Восстановление пароля</h1>
      <div className="mt-6">
        Для восстановления пароля позвоните своему менеджеру по телефону:
      </div>
      <div className="mt-6 rounded-full bg-primary w-8 h-8 flex flex-col items-center justify-center mx-auto">
        <IcPhone className="text-white" />
      </div>
      <div className="mt-4 font-bold text-lg">{phone}</div>
    </>
  );
}

export default RecoveryPassword;
