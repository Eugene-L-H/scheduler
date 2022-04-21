import React, { useState } from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const [interviewer, setInterviewer] = useState(1);

  const interviewerClass = classNames (
    'interviewers__item',
    {'interviewers__item--selected': props.selected}
  );

  const conditionalName = props.selected ? props.name : '';

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}  
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {conditionalName}
    </li>
  );
}