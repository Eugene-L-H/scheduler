// A list that holds list-items of DayListItems
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const populateDayList = props.days.map(
    day => {
      return <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
      />
  });

  return (
    <ul>{populateDayList}</ul>
  )
};