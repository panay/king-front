import React, { ReactElement } from "react";
import Sidebar from "ui/Sidebar";
import { logoutFx } from "infrastructure/models/auth/login";
import { ReactComponent as IcHome } from "infrastructure/assets/images/svgs/ic-home.svg";
import "infrastructure/models/auth/init";

function Layout({ children }: { children: ReactElement }) {
  const nav = [
    {
      to: "/",
      content: <IcHome />,
    },
  ];
  const handleLogout = () => {
    return logoutFx();
  };
  return (
    <div className="flex h-full">
      <Sidebar nav={nav} onLogout={handleLogout} />
      <div className="p-6 xl:w-8/12 md:w-7/12">
        <header>Header Layout'a</header>
        {children}
      </div>
      <div
        className="p-6 xl:w-4/12 md:w-5/12 outline-black"
      >
        Additional Side Page
      </div>
    </div>
  );
}

export default Layout;
