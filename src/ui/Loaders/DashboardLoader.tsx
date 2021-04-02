import React from "react";
import ContentLoader from "react-content-loader";
import TwoColumnsLoader from "./TwoColumnsLoader";

function DashboardLoader() {
  return (
    <TwoColumnsLoader>
      <>
        <div className="flex justify-between items-center">
          <div>
            <div className="bg-white rounded-xl w-32 h-3" />
            <div className="bg-white rounded-xl w-48 mt-2 h-10" />
          </div>
          <div>
            <div className="h-3" />
            <div className="w-48 mt-2 flex w-full">
              <div className="bg-white rounded-xl h-10 w-10 mr-4" />
              <div className="bg-white rounded-xl h-10 w-10 mr-4" />
              <div className="bg-white rounded-xl h-10 w-64" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2.5">
          <div className="px-2.5 pt-5 w-1/3">
            <div className="group block p-4 bg-white rounded-xl">
              <ContentLoader
                alignmentBaseline={"central"}
                width={180}
                height={110}
              >
                <rect x="0" y="0" rx="5" ry="5" width="42" height="42" />
                <rect x="0" y="60" rx="5" ry="5" width="160" height="20" />
                <rect x="0" y="85" rx="5" ry="5" width="130" height="12" />
              </ContentLoader>
            </div>
          </div>
          <div className="px-2.5 pt-5 w-1/3">
            <div className="group block p-4 bg-white rounded-xl">
              <ContentLoader
                alignmentBaseline={"central"}
                width={180}
                height={110}
              >
                <rect x="0" y="0" rx="5" ry="5" width="42" height="42" />
                <rect x="0" y="60" rx="5" ry="5" width="160" height="20" />
                <rect x="0" y="85" rx="5" ry="5" width="130" height="12" />
              </ContentLoader>
            </div>
          </div>
          <div className="px-2.5 pt-5 w-1/3">
            <div className="group block p-4 bg-white rounded-xl">
              <ContentLoader
                alignmentBaseline={"central"}
                width={180}
                height={110}
              >
                <rect x="0" y="0" rx="5" ry="5" width="42" height="42" />
                <rect x="0" y="60" rx="5" ry="5" width="160" height="20" />
                <rect x="0" y="85" rx="5" ry="5" width="130" height="12" />
              </ContentLoader>
            </div>
          </div>
          <div className="px-2.5 pt-5 w-1/3">
            <div className="group block p-4 bg-white rounded-xl">
              <ContentLoader
                alignmentBaseline={"central"}
                width={180}
                height={110}
              >
                <rect x="0" y="0" rx="5" ry="5" width="42" height="42" />
                <rect x="0" y="60" rx="5" ry="5" width="160" height="20" />
                <rect x="0" y="85" rx="5" ry="5" width="130" height="12" />
              </ContentLoader>
            </div>
          </div>
          <div className="px-2.5 pt-5 w-1/3">
            <div className="group block p-4 bg-white rounded-xl">
              <ContentLoader
                alignmentBaseline={"central"}
                width={180}
                height={110}
              >
                <rect x="0" y="0" rx="5" ry="5" width="42" height="42" />
                <rect x="0" y="60" rx="5" ry="5" width="160" height="20" />
                <rect x="0" y="85" rx="5" ry="5" width="130" height="12" />
              </ContentLoader>
            </div>
          </div>
          <div className="px-2.5 pt-5 w-1/3">
            <div className="group block p-4 bg-white rounded-xl">
              <ContentLoader
                alignmentBaseline={"central"}
                width={180}
                height={110}
              >
                <rect x="0" y="0" rx="5" ry="5" width="42" height="42" />
                <rect x="0" y="60" rx="5" ry="5" width="160" height="20" />
                <rect x="0" y="85" rx="5" ry="5" width="130" height="12" />
              </ContentLoader>
            </div>
          </div>

          <div className="px-2.5 pt-5 w-1/2">
            <div
              className="block p-4 bg-white rounded-xl flex flex-col justify-center items-center"
              style={{
                height: "300px",
              }}
            >
              <div className="m-auto">
                <ContentLoader
                  alignmentBaseline={"central"}
                  width={40}
                  height={40}
                >
                  <rect x="0" y="0" rx="2" ry="2" width="6" height="30" />
                  <rect x="12" y="12" rx="2" ry="2" width="6" height="18" />
                  <rect x="24" y="6" rx="2" ry="2" width="6" height="24" />
                </ContentLoader>
              </div>
            </div>
          </div>
          <div className="px-2.5 pt-5 w-1/2">
            <div
              className="block p-4 bg-white rounded-xl flex flex-col justify-center items-center"
              style={{
                height: "300px",
              }}
            >
              <div className="m-auto">
                <ContentLoader
                  alignmentBaseline={"central"}
                  width={40}
                  height={40}
                >
                  <rect x="0" y="0" rx="2" ry="2" width="6" height="30" />
                  <rect x="12" y="12" rx="2" ry="2" width="6" height="18" />
                  <rect x="24" y="6" rx="2" ry="2" width="6" height="24" />
                </ContentLoader>
              </div>
            </div>
          </div>
        </div>
      </>
    </TwoColumnsLoader>
  );
}

export default DashboardLoader;
