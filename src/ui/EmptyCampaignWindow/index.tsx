import React from "react";
import { ReactComponent as PicCampaign } from "infrastructure/assets/images/svgs/pic-campaign.svg";
import Button from "../Button";
import { useHistory } from "react-router-dom";

function EmptyCampaignsWindow() {
  const history = useHistory();
  const handleCreateCampaign = () => {
    history.push("/campaigns");
  };

  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <PicCampaign className="mx-auto" />
      <h2 className="mt-6 lg:mx-6">
        Пока нет созданных или проведённых кампаний
      </h2>
      <Button
        onClick={handleCreateCampaign}
        value="Создать кампанию"
        className="mt-6"
      />
    </div>
  );
}

export default EmptyCampaignsWindow;
