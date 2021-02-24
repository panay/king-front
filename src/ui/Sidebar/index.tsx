import React, { ReactElement, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as IcExit } from "infrastructure/assets/images/svgs/ic-exit.svg";

type Props = {
  user?: HTMLImageElement | string;
  nav: {
    to: string;
    content: ReactElement | string;
  }[];
  onLogout: () => void;
};

function Sidebar({ user, nav, onLogout }: Props) {
  const handleOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    onLogout();
  };
  return (
    <aside className="bg-primary w-20 flex flex-col items-center justify-between py-6">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden flex flex-col items-center justify-center bg-input-grey text-default text-xl font-bold">
          {user || "СП"}
        </div>
        <nav>
          {nav.map((link, index) => (
            <NavLink
              key={index}
              exact
              to={link.to}
              className="block mt-6 rounded-xl text-white p-3 hover:bg-white hover:bg-opacity-20 hover:text-white"
              activeClassName="text-white bg-white bg-opacity-20"
            >
              {link.content}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        <a href="/#" onClick={handleOnClick} title="Выйти">
          <IcExit className="text-white" />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
