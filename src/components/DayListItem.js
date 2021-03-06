// The DayList Item is responsible for displaying the name and spots remaining
// for a single day.
import React from 'react';

import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {

  const formatSpots = function () {
    if (props.spots === 0) {
      return 'no spots remaining';
    } else if (props.spots === 1) {
      return '1 spot remaining';
    }
    return `${props.spots} spots remaining`;
  };

  const listItemClass = classNames(
    'day-list__item',
    { 'day-list__item--selected': props.selected },
    { 'day-list__item--full': props.spots === 0 }
  );

  return (
    <li
      className={listItemClass}
      onClick={props.setDay}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}