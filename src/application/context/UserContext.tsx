import React from "react";
import { useStore } from "effector-react";
import { $user, IUser } from "infrastructure/models/auth/user";

const UserContext = React.createContext<IUser | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const user = useStore($user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
export { UserProvider };
