import React, {useEffect, ReactElement, createContext} from "react";
import { useStore } from "effector-react";
import {$authenticated, $afterLogin, checkUserAuth} from "../models/auth/login";
import {$user} from "../models/auth/user";

const AuthContext = createContext<boolean>(false);

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const afterLogin = useStore($afterLogin);
  const authenticated = useStore($authenticated);
  const user = useStore($user);

  useEffect(() => {
    if (!afterLogin && user?.id && authenticated) {
      checkUserAuth(user?.login)
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
