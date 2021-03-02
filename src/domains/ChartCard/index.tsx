import React, { SyntheticEvent } from "react";
import { ReactComponent as IcPrint } from "infrastructure/assets/images/svgs/ic-print.svg";
import Chart from "react-apexcharts";

type Props = {
  title: string;
  data?: unknown[];
  options?: object;
  onPrint?: (data: unknown) => void;
};

function ChartCard({ title, data = [], options, onPrint }: Props) {
  const handleOnClick = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onPrint) {
      onPrint({});
    }
  };

  return (
    <div className="block p-4 bg-white rounded-xl border border-border-grey">
      <div className="flex justify-between">
        <div>
          <h2>{title}</h2>
          <p className="text-xs text-icon-grey mt-1.5">За последнюю неделю</p>
        </div>
        <button
          onClick={handleOnClick}
          className="group bg-input-grey border-none rounded-xl p-2.5 w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
        >
          <IcPrint className="text-icon-grey group-hover:text-primary" />
        </button>
      </div>
      <div className="mt-4">
        <Chart
            options={options}
            series={data}
            type="bar"
            width="100%"
        />
      </div>
    </div>
  );
}

export default ChartCard;
