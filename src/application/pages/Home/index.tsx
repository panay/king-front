import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Layout from "domain/Layout";

function Home() {
  useEffect(() => {
    document.title = "Главная – Spark [radar]";
  });
  const user = useContext(UserContext);

  return (
    <Layout>
      <div>ДАШБОАРД</div>
    </Layout>
  );
}

export default Home;
