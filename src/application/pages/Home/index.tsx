import React, { useEffect } from "react";
import { Header } from "ui";
import { CompanyPanel, TwoColumnLayout } from "domains";
import Campaigns from "./components/Campaigns";
import Card from "./components/Card";
import { ReactComponent as IcGeo } from "infrastructure/assets/images/svgs/ic-geo.svg";
import { ReactComponent as IcApp } from "infrastructure/assets/images/svgs/ic-app.svg";
import { ReactComponent as IcTrack } from "infrastructure/assets/images/svgs/ic-track.svg";
import { ReactComponent as IcGeofence } from "infrastructure/assets/images/svgs/ic-geofence.svg";
import { ReactComponent as IcCampaigns } from "infrastructure/assets/images/svgs/ic-marketing.svg";
import { ReactComponent as IcGeotrigger } from "infrastructure/assets/images/svgs/ic-geotriger.svg";

function Home() {
  const handleOnSearch = (value: string) => {
    console.log("Home Search :: ", value);
  };

  useEffect(() => {
    document.title = "Главная – Spark [radar]";
  }, []);

  return (
    <TwoColumnLayout className="bg-input-grey" asideContent={<Campaigns />}>
      <Header headerTitle={<CompanyPanel />} onSearch={handleOnSearch} />
      <div className="flex flex-wrap -mx-2.5">
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcGeo />}
            color="ic-violet"
            title="Местоположения"
            growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcApp />}
            color="ic-orange"
            title="Приложения"
            growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcTrack />}
            color="ic-green"
            title="Маршруты"
            growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcGeofence />}
            color="primary"
            title="Геофенсы"
            growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcCampaigns />}
            color="ic-lawngreen"
            title="Кампании"
            growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcGeotrigger />}
            color="ic-purple"
            title="Геотриггеры"
            growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/2">
          <Card
              icon={<IcGeotrigger />}
              color="ic-purple"
              title="Уведомления"
              growth="0%"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/2">
          <Card
              icon={<IcGeotrigger />}
              color="ic-purple"
              title="Подключенные устройства"
              growth="0%"
          />
        </div>
      </div>
    </TwoColumnLayout>
  );
}

export default Home;
