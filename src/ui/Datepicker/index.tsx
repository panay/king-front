import React from "react";
import Calendar, { CalendarProps } from "react-calendar";
import 'infrastructure/assets/styles/calendar.scss';
import {ReactComponent as IcArrownLeft} from "infrastructure/assets/images/svgs/ic-arrown-left.svg";
import {ReactComponent as IcArrownRight} from "infrastructure/assets/images/svgs/ic-arrown-right.svg";

type Props = CalendarProps;

function Datepicker(props: Props) {
  return (
      <Calendar
          onChange={props.onChange}
          value={props.value}
          {...props}
          next2Label=""
          prev2Label=""
          prevLabel={<IcArrownLeft className="text-primary hover:text-hover-primary" />}
          nextLabel={<IcArrownRight className="text-primary hover:text-hover-primary" />}
      />
  );
}

export default Datepicker;
