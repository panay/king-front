import React, {useEffect, ReactElement, createContext} from "react";
import { useStore } from "effector-react";
import {$authenticated, $afterLogin, checkAuthFx} from "../models/auth/login";
import {$user} from "../models/auth/user";

const AuthContext = createContext<boolean>(false);

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const afterLogin = useStore($afterLogin);
  const authenticated = useStore($authenticated);
  const user = useStore($user);

  useEffect(() => {
    if (!afterLogin && user?.id && authenticated) {
      checkAuthFx(user?.login || "admin@gmail.com").then();
    }
  }, [afterLogin, authenticated, user]);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
