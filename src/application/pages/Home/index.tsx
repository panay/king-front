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
import { ReactComponent as GraphApps } from "infrastructure/assets/images/svgs/graph-apps.svg";
import { ReactComponent as GraphCampaigns } from "infrastructure/assets/images/svgs/graph-campaigns.svg";
import { ReactComponent as GraphFence } from "infrastructure/assets/images/svgs/graph-geofence.svg";
import { ReactComponent as GraphTrigger } from "infrastructure/assets/images/svgs/graph-geotrigger.svg";
import ChartCard from "domains/ChartCard";

function Home() {
  const handleOnSearch = (value: string) => {
    console.log("Home Search :: ", value);
  };

  const tempChartOptions1 = {
    options: {
      chart: {
        id: "basic-bar1",
      },
      xaxis: {
        categories: ["Мар 9", "Мар 16", "Мар 23", "Мар 30"],
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          colorStops: [
            [
              {
                offset: 0,
                color: "#41b2ff",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#0052cc",
                opacity: 1,
              },
            ],
            [
              {
                offset: 0,
                color: "#e6f1ff",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#c9dfff",
                opacity: 1,
              },
            ],
          ],
        },
      },
      legend: {
        markers: {
          fillColors: ["#0052cc", "#c9dfff"],
        },
        horizontalAlign: "left"
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          borderRadius: 4,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Отправлено",
        data: [220, 110, 40, 160],
      },
      {
        name: "Открыто",
        data: [100, 160, 15, 20],
      },
    ],
  };

  const tempChartOptions2 = {
    options: {
      chart: {
        id: "basic-bar2",
      },
      xaxis: {
        categories: ["Мар 9", "Мар 16", "Мар 23", "Мар 30"],
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          colorStops: [
            [
              {
                offset: 0,
                color: "#41b2ff",
                opacity: 1,
              },
              {
                offset: 100,
                color: "#0052cc",
                opacity: 1,
              },
            ]
          ],
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        showForNullSeries: true,
        showForZeroSeries: true,
        markers: {
          fillColors: ["#0052cc"],
        },
        horizontalAlign: "left"
      },
      plotOptions: {
        bar: {
          columnWidth: "15%",
          borderRadius: 4,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Количество устройств",
        data: [0.2, 0.2, 7, 5],
      }
    ],
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
            color="icon-violet"
            title="Местоположения"
            growth="0%"
            to="/geo"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcApp />}
            color="icon-orange"
            title="Приложения"
            growth="+5%"
            to="/apps"
            graphIcon={<GraphApps />}
            totalAmount="23 установки"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcTrack />}
            color="icon-green"
            title="Маршруты"
            growth="0%"
            to="/routes"
            totalAmount="Всего 3 записи"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcGeofence />}
            color="primary"
            title="Геофенсы"
            growth="-3%"
            to="/geofence"
            graphIcon={<GraphFence />}
            totalAmount="Всего 159 записей"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcCampaigns />}
            color="icon-lawngreen"
            title="Кампании"
            growth="-7%"
            to="/campaigns"
            graphIcon={<GraphCampaigns />}
            totalAmount="Проведенных 47"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/3">
          <Card
            icon={<IcGeotrigger />}
            color="icon-purple"
            title="Геотриггеры"
            growth="+6%"
            graphIcon={<GraphTrigger />}
            to="/geotrigger"
          />
        </div>
        <div className="px-2.5 pt-5 w-1/2">
          <ChartCard
            title="Уведомление"
            data={tempChartOptions1.series}
            options={tempChartOptions1.options}
          />
        </div>
        <div className="px-2.5 pt-5 w-1/2">
          <ChartCard
            title="Подключенные устройства"
            data={tempChartOptions2.series}
            options={tempChartOptions2.options}
          />
        </div>
      </div>
    </TwoColumnLayout>
  );
}

export default Home;
