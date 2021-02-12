import React, {useEffect} from "react";

function NotFound() {
  useEffect(() => {
    document.title = "Страница не найдена – Spark[radar]";
  });
  return <div>404 Not Found</div>;
}

export default NotFound;
