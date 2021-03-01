import React, { ReactElement } from "react";

function Scrollbar({
  children,
  maxHeight = "300px",
}: {
  children: ReactElement;
  maxHeight?: string;
}) {
  return (
    <div
      className="overflow-auto scrollbar-thin scrollbar-thumb-border-grey scrollbar-track-input-grey"
      style={{
        maxHeight,
      }}
    >
      {children}
    </div>
  );
}

export default Scrollbar;
