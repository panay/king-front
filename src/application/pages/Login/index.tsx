import React, { useEffect } from "react";
import {Auth} from "domains";
import { ReactComponent as Logo } from "infrastructure/assets/images/svgs/logo.svg";

import AuthBg from "infrastructure/assets/images/pngs/auth-bg.png";
import AuthBg2x from "infrastructure/assets/images/pngs/auth-bg@2x.png";
import AuthBg3x from "infrastructure/assets/images/pngs/auth-bg@3x.png";

function Login() {
  useEffect(() => {
    document.title = "Авторизация – Spark [radar]";
  });

  return (
    <div className="bg-primary flex flex-col items-center justify-center p-3 h-full">
      <Logo className="text-white relative z-10" />
      <Auth />

      <img
        src={AuthBg}
        srcSet={`${AuthBg} 1x, ${AuthBg2x} 2x, ${AuthBg3x} 3x`}
        alt="bubbles background"
        className="fixed top-0 left-0 right-0 bottom-0 z-0 max-w-full w-full h-full object-cover"
      />
    </div>
  );
}

export default Login;
