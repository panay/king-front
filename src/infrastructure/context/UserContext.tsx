import React, { ReactElement, useEffect } from "react";
import { useStore } from "effector-react";
import { $user, IUser } from "../models/auth/user";
import { $authenticated, checkAuthFx } from "../models/auth/login";

const UserContext = React.createContext<IUser | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactElement }) => {
  const authenticated = useStore($authenticated);
  const user = useStore($user);

  useEffect(() => {
    if (user && authenticated) {
      checkAuthFx(user?.login || "admin@gmail.com").then();
    }
  }, [authenticated, user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
export { UserProvider };
