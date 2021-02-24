import React, { HTMLProps, ReactElement } from "react";
import { ReactComponent as IcUser } from "infrastructure/assets/images/svgs/ic-users.svg";
import { ReactComponent as IcSettings } from "infrastructure/assets/images/svgs/ic-settings.svg";
import { NavLink } from "react-router-dom";
import SearchInput from "../SearchInput";

type Props = HTMLProps<unknown> & {
  headerTitle: ReactElement | string;
  showUserSettings?: boolean;
  onSearch?: (value: string) => void;
};

function Header({ headerTitle, showUserSettings, onSearch, ...props }: Props) {
  const handleSearch = (value: string) => {
    if (onSearch && value && value.trim() !== "") {
      onSearch(value);
    }
  };

  return (
    <header className="flex items-center justify-between">
      <h1>{headerTitle}</h1>
      <div className="flex items-center">
        <div className="mr-4">{props.children}</div>
        <NavLink
          exact
          to="/users"
          className="block mr-4 rounded-xl p-2.5 bg-white hover:bg-primary hover:text-white"
          activeClassName="text-white bg-primary"
        >
          <IcUser />
        </NavLink>
        <NavLink
          exact
          to="/settings"
          className="block mr-4 rounded-xl p-2.5 bg-white hover:bg-primary hover:text-white"
          activeClassName="text-white bg-primary"
        >
          <IcSettings />
        </NavLink>
        <SearchInput onSearch={handleSearch} placeholder={props.placeholder} />
      </div>
    </header>
  );
}

export default Header;
