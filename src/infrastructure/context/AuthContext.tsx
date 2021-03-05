import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $authenticated, checkAuthFx } from "../models/auth/login";
import { $user } from "../models/auth/user";

const AuthContext = React.createContext<boolean>(false);

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const authenticated = useStore($authenticated);
  const user = useStore($user);

  useEffect(() => {
    checkAuthFx(user?.login || "admin").then();
  }, [user]);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
