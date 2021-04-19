import React from "react";
import ReactTooltip, { Effect, Place } from "react-tooltip";
import styles from "./Tooltip.module.scss";

function Tooltip({
  id,
  place = "bottom",
  effect = "float",
  arrow = true,
}: {
  id: string;
  place?: Place;
  effect?: Effect;
  arrow?: boolean;
}) {
  return arrow ? (
    <ReactTooltip
      id={id}
      place={place}
      className={styles.radarTooltip}
      effect={effect}
      textColor="#ffffff"
      backgroundColor="#4b87df"
    />
  ) : (
    <ReactTooltip
      place={place}
      className={styles.radarTooltip}
      effect={effect}
      textColor="#ffffff"
      backgroundColor="#4b87df"
      arrowColor="transparent"
    />
  );
}

export default Tooltip;
