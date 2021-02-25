import React, { SyntheticEvent } from "react";

type Props = {
  recovery: boolean;
  onClick: (mode: boolean) => void;
};

function AuthFooter({ recovery, onClick }: Props) {
  const handleOnClick = (event: SyntheticEvent, mode: boolean) => {
    event.preventDefault();
    onClick(mode);
  };

  return recovery ? (
    <p className="mt-6 text-xs">
      <a href="/#" onClick={event => handleOnClick(event, false)} title="Вернуться назад">
        Вернуться назад
      </a>
    </p>
  ) : (
    <div className="mt-6 text-xs">
      <p className="text-icon-grey">
        Если вы забыли пароль, воспользуйтесь функцией
      </p>
      <p>
        <a
          href="/#"
          onClick={event => handleOnClick(event, true)}
          title="Восстановление пароля"
        >
          Восстановление пароля
        </a>
      </p>
    </div>
  );
}

export default AuthFooter;
