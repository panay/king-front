import React, { createContext, useContext } from "react";
import { useStore } from "effector-react";
import {$authenticated} from "infrastructure/models/auth/login";

const AuthStateContext = createContext<boolean>(false);

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

// const AuthProvider = ({ children }: { children: React.ComponentType<any> }) => {
//   const token = useStore($authenticated);
//
//   return (
//     <AuthStateContext.Provider value={token}>
//       {children}
//     </AuthStateContext.Provider>
//   );
// };

export { useAuthState };
