import React, { ReactElement } from "react";
import { ReactComponent as IcHome } from "infrastructure/assets/images/svgs/ic-home.svg";
import { ReactComponent as IcGeo } from "infrastructure/assets/images/svgs/ic-geo.svg";
import { ReactComponent as IcApp } from "infrastructure/assets/images/svgs/ic-app.svg";
import { ReactComponent as IcTrack } from "infrastructure/assets/images/svgs/ic-track.svg";
import { ReactComponent as IcGeofence } from "infrastructure/assets/images/svgs/ic-geofence.svg";
import { ReactComponent as IcMarketing } from "infrastructure/assets/images/svgs/ic-marketing.svg";
import { ReactComponent as IcGeotrigger } from "infrastructure/assets/images/svgs/ic-geotriger.svg";
import { ReactComponent as IcAnalytics } from "infrastructure/assets/images/svgs/ic-analytics.svg";
import { signOut } from "infrastructure/models/auth/login";
import "infrastructure/models/auth/init";
import {Sidebar} from "ui";

function SidebarLayout({ children }: { children: ReactElement }) {
  const nav = [
    {
      to: "/",
      icon: <IcHome />,
      text: "Дашбоард"
    },
    {
      to: "/location",
      icon: <IcGeo />,
      text: "Местоположения"
    },
    {
      to: "/apps",
      icon: <IcApp />,
      text: "Приложения"
    },
    {
      to: "/routes",
      icon: <IcTrack />,
      text: "Маршруты"
    },
    {
      to: "/geofence",
      icon: <IcGeofence />,
      text: "Геофенсы"
    },
    {
      to: "/campaigns",
      icon: <IcMarketing />,
      text: "Кампании"
    },
    {
      to: "/geotrigger",
      icon: <IcGeotrigger />,
      text: "Геотриггеры"
    },
    {
      to: "/analytics",
      icon: <IcAnalytics />,
      text: "Аналитика"
    },
  ];

  return (
    <div className="flex min-h-full">
      <Sidebar nav={nav} onLogout={signOut} />
      {children}
    </div>
  );
}

export default SidebarLayout;
