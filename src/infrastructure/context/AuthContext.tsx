import React, { createContext, ReactElement, useEffect } from "react";
import { useStore } from "effector-react";
import {
  $afterLogin,
  $authenticated,
  $checkedAuth,
  checkUserAuth,
} from "../models/auth/login";
import { $user } from "../models/auth/user";

const AuthContext = createContext<boolean>(false);
const CheckAuthContext = createContext<boolean | null>(null);

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const afterLogin = useStore($afterLogin);
  const checkedAuth = useStore($checkedAuth);
  const authenticated = useStore($authenticated);
  const user = useStore($user);

  useEffect(() => {
    if (!afterLogin && user?.id && authenticated) {
      checkUserAuth(user?.login);
    }
  }, [afterLogin, authenticated, user]);

  return (
    <AuthContext.Provider value={authenticated}>
      <CheckAuthContext.Provider value={checkedAuth}>
        {children}
      </CheckAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export {AuthContext, CheckAuthContext};
export default AuthContext;
export { AuthProvider };
