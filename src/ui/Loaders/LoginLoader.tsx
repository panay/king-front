import React from "react";
import ContentLoader from "react-content-loader";

function LoginLoader() {
  return (
    <div className="bg-white rounded-xl p-3">
      <ContentLoader alignmentBaseline={"central"} width={380} height={360}>
        <rect x="40" y="0" rx="5" ry="5" width="300" height="50" />
        <rect x="0" y="80" rx="10" ry="10" width="380" height="280" />
      </ContentLoader>
    </div>
  );
}

export default LoginLoader;
