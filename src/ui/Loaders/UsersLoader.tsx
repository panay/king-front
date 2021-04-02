import React from "react";
import TableLoader from "./TableLoader";
import TwoColumnsLoader from "./TwoColumnsLoader";

function UsersLoader() {
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
        <div className="mt-4 bg-white rounded-xl p-4">
          <TableLoader />
        </div>
      </>
    </TwoColumnsLoader>
  );
}

export default UsersLoader;
