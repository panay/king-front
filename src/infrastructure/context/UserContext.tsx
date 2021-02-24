import React, { ReactElement } from "react";
import { useStore } from "effector-react";
import { $user, IUser } from "../models/auth/user";

const UserContext = React.createContext<IUser | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactElement }) => {
  const user = useStore($user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
export { UserProvider };
