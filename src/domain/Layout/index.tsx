import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { ReactComponent as IcHome } from "infrastructure/assets/images/svgs/ic-home.svg";
import { ReactComponent as IcGeo } from "infrastructure/assets/images/svgs/ic-geo.svg";
import { ReactComponent as IcApp } from "infrastructure/assets/images/svgs/ic-app.svg";
import { ReactComponent as IcTrack } from "infrastructure/assets/images/svgs/ic-track.svg";
import { ReactComponent as IcGeofence } from "infrastructure/assets/images/svgs/ic-geofence.svg";
import { ReactComponent as IcMarketing } from "infrastructure/assets/images/svgs/ic-marketing.svg";
import { ReactComponent as IcGeotrigger } from "infrastructure/assets/images/svgs/ic-geotriger.svg";
import { ReactComponent as IcAnalytics } from "infrastructure/assets/images/svgs/ic-analytics.svg";
import { logoutFx } from "infrastructure/models/auth/login";
import "infrastructure/models/auth/init";
import Sidebar from "ui/Sidebar";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  asideContent?: ReactElement;
};

function Layout({ asideContent, ...props }: Props) {
  const nav = [
    {
      to: "/",
      content: <IcHome />,
    },
    {
      to: "/geo",
      content: <IcGeo />,
    },
    {
      to: "/apps",
      content: <IcApp />,
    },
    {
      to: "/routes",
      content: <IcTrack />,
    },
    {
      to: "/geofence",
      content: <IcGeofence />,
    },
    {
      to: "/campaigns",
      content: <IcMarketing />,
    },
    {
      to: "/geotrigger",
      content: <IcGeotrigger />,
    },
    {
      to: "/analytics",
      content: <IcAnalytics />,
    },
  ];
  const handleLogout = () => {
    return logoutFx();
  };

  return (
    <div className="flex h-full">
      <Sidebar nav={nav} onLogout={handleLogout} />
      <div
        {...props}
        className={
          asideContent
            ? props.className + " bg-input-grey p-6 xl:w-8/12 md:w-7/12"
            : props.className + " p-6 w-full"
        }
      >
        {props.children}
      </div>
      {asideContent ? (
        <div className="p-6 xl:w-4/12 md:w-5/12">{asideContent}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Layout;
