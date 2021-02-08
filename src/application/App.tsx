import React from 'react';
import Button from "../ui/Button";
import {ReactComponent as Logo} from "../infrastructure/assets/images/svgs/logo.svg";
import {ReactComponent as PicCampaign} from "../infrastructure/assets/images/svgs/pic-campaign.svg";
import {ReactComponent as IcHome} from "../infrastructure/assets/images/svgs/ic-home.svg"

function App() {
  return (
    <div className="max-w-sm m-auto">
        <Logo className="text-button-link"/>
        <PicCampaign />
        <IcHome className="text-success" />
      <Button value="Применить" />
    </div>
  );
}

export default App;
