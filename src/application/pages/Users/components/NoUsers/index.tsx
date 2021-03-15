import React from "react";
import NoUsersBg from "infrastructure/assets/images/pngs/group-people.png";
import NoUsersBg2x from "infrastructure/assets/images/pngs/group-people@2x.png";
import NoUsersBg3x from "infrastructure/assets/images/pngs/group-people@3x.png";

function NoUsers() {
  return (
    <div className="text-center py-14 mx-auto">
      <img
        src={NoUsersBg}
        srcSet={`${NoUsersBg} 1x, ${NoUsersBg2x} 2x, ${NoUsersBg3x} 3x`}
        alt="Пользователей нет"
        className="mx-auto"
      />

      <h2 className="mt-10">Пользователей нет</h2>
      <p className="mt-1 text-icon-grey text-xs">
        Для добавления внесите данные в&nbsp;карточку информации пользователя
      </p>
    </div>
  );
}

export default NoUsers;
