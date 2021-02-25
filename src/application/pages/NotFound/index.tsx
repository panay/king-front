import React, { useEffect } from "react";
import NotFoundBg from "infrastructure/assets/images/pngs/pic-error-404.png";
import NotFoundBg2x from "infrastructure/assets/images/pngs/pic-error-404@2x.png";
import NotFoundBg3x from "infrastructure/assets/images/pngs/pic-error-404@3x.png";

function NotFound() {
  useEffect(() => {
    document.title = "Страница не найдена – Spark[radar]";
  });

  return (
    <div className="text-center py-14 mx-auto">
      <h1>Страница не&nbsp;найдена</h1>
      <img
        src={NotFoundBg}
        srcSet={`${NotFoundBg} 1x, ${NotFoundBg2x} 2x, ${NotFoundBg3x} 3x`}
        alt="404 Page Not Found"
        className="mt-8"
      />
    </div>
  );
}

export default NotFound;
