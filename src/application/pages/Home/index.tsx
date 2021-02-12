import React, {useEffect} from "react";

function Home() {
  useEffect(() => {
    document.title = "Главная – Spark[radar]";
  });
  return <div>Home</div>;
}

export default Home;
