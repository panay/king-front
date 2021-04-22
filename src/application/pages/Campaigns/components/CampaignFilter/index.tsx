import React, { SyntheticEvent, useState } from "react";
import { ReactComponent as IcRefresh } from "infrastructure/assets/images/svgs/ic-refresh.svg";

type Props = {
  changeModel?: (value: unknown) => void;
};

function CampaignFilter({ changeModel }: Props) {
  const defaultModel = {
    location: null,
    platforms: null,
    period: null,
    state: null,
  };
  const [model, setModel] = useState({});

  const resetFilter = (event: SyntheticEvent) => {
    event.preventDefault();
    setModel({});
  };

  return (
    <div className="bg-lighten-grey border border-input-grey rounded-xl p-3 flex justify-between">
      <div className="flex">
        <strong className="mr-2">Фильтр:</strong>
      </div>
      <button
        onClick={resetFilter}
        className="border-none text-primary cursor-pointer disabled:text-icon-grey"
        disabled={!Object.keys(model).length}
      >
        <IcRefresh />
      </button>
    </div>
  );
}

export default CampaignFilter;
