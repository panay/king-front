import React, { HTMLProps, ReactElement, useContext } from "react";
import { ReactComponent as IcUser } from "infrastructure/assets/images/svgs/ic-users.svg";
import { ReactComponent as IcSettings } from "infrastructure/assets/images/svgs/ic-settings.svg";
import { NavLink } from "react-router-dom";
import SearchInput from "../SearchInput";
import UserContext from "infrastructure/context/UserContext";

type Props = HTMLProps<unknown> & {
  headerTitle: ReactElement | string;
  showUserSettings?: boolean;
  onSearch?: (value: string) => void;
};

function Header({ headerTitle, onSearch, ...props }: Props) {
  const user = useContext(UserContext);
  const isAdmin = user?.role.name === "ADMIN";

  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="flex items-center -mx-2.5">
      <h1 className="px-2.5 flex-auto">{headerTitle}</h1>
      <div className="px-2.5 flex flex-auto justify-end">
        {props.children}
        {isAdmin ? (
          <>
            <NavLink
              exact
              to="/users"
              className="block mr-4 rounded-xl w-10 h-10 flex flex-col justify-center items-center text-icon-grey bg-white hover:bg-primary hover:text-white"
              activeClassName="text-icon-white bg-primary"
            >
              <IcUser />
            </NavLink>
            <NavLink
              exact
              to="/settings"
              className="block rounded-xl w-10 h-10 flex flex-col justify-center items-center text-icon-grey bg-white hover:bg-primary hover:text-white"
              activeClassName="text-icon-white bg-primary"
            >
              <IcSettings />
            </NavLink>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="px-2.5 w-1/3">
        <SearchInput onSearch={handleSearch} placeholder={props.placeholder || "Поиск"} />
      </div>
    </header>
  );
}

export default Header;
