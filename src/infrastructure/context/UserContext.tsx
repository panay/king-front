import React, { ReactElement, createContext } from "react";
import { useStore } from "effector-react";
import { $user, IUser } from "../models/auth/user";

const UserContext = createContext<IUser | null>(null);

const UserProvider = ({ children }: { children: ReactElement }) => {
  const user = useStore($user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
export { UserProvider };
