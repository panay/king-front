import React from "react";
import { useStore } from "effector-react";
import { $authenticated } from "infrastructure/models/auth/login";

const AuthContext = React.createContext<boolean>(false);

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const authenticated = useStore($authenticated);

  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
