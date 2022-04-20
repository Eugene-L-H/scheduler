import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerListItemClass = classNames (
    'interviewers___item',
    {'interviewers__item--selected': props.selected}
  );

  const conditionalName = props.selected ? props.name : '';

  const setInterviewer = function(id) {
    console.log('ProfID: ', id);
  }

  return (
    <li
      className={interviewerListItemClass}
      id={props.id}
      name={props.conditionalName}
      avatar={props.avatar}
      onClick={() => {setInterviewer(props.id)}}  
    >
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {conditionalName}
    </li>
  );
}