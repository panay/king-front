import React, { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  asideContent?: ReactElement;
};

function TwoColumnLayout({ asideContent, ...props }: Props) {
  return (
    <div className="flex flex-1 min-h-full">
      <div
        {...props}
        className={
          asideContent
            ? props.className + " bg-input-grey p-6 xl:w-8/12 md:w-7/12"
            : props.className + " p-6 w-full"
        }
      >
        {props.children}
      </div>
      {asideContent ? (
        <div className="p-6 xl:w-4/12 md:w-5/12">{asideContent}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TwoColumnLayout;
