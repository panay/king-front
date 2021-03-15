import React from "react";
import NotFoundBg from "infrastructure/assets/images/pngs/pic-error-404.png";
import NotFoundBg2x from "infrastructure/assets/images/pngs/pic-error-404@2x.png";
import NotFoundBg3x from "infrastructure/assets/images/pngs/pic-error-404@3x.png";

function NoUsers() {
  return (
    <div className="text-center py-14 mx-auto">
      <img
        src={NotFoundBg}
        srcSet={`${NotFoundBg} 1x, ${NotFoundBg2x} 2x, ${NotFoundBg3x} 3x`}
        alt="Пользователей нет"
        className="mt-8"
      />

      <h2>Пользователей нет</h2>
      <p>Для добавления внесите данные в&nbsp;карточку информации пользователя</p>
    </div>
  );
}

export default NoUsers;
