import React, { ReactElement } from "react";
import ContentLoader from "react-content-loader";

function TwoColumnsLoader({ children }: { children: ReactElement }) {
  return (
    <div className="flex flex-1 min-h-full">
      <div className="bg-input-grey p-6 xl:w-8/12 md:w-7/12">{children}</div>
      <div className="bg-white p-6 xl:w-4/12 md:w-5/12 relative flex flex-col items-center jusitfy-center">
        <ContentLoader
          alignmentBaseline={"central"}
          width={180}
          height={160}
          className="m-auto"
        >
          <rect x="50" y="0" rx="5" ry="5" width="60" height="60" />
          <rect x="0" y="80" rx="5" ry="5" width="160" height="20" />
          <rect x="16" y="110" rx="5" ry="5" width="130" height="16" />
        </ContentLoader>
      </div>
    </div>
  );
}

export default TwoColumnsLoader;
