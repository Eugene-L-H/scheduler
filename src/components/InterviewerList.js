import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss';
// import { action } from "@storybook/addon-actions";

export default function InterviewerList(props) {
  const { interviewers, value, onChange} = props;

  const populateInterviewerList = interviewers.map(
    interviewer => {
      return (
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === value}
          setInterviewer={() => onChange(interviewer.id)}
        />
      );
    }
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {populateInterviewerList}
      </ul>
    </section>
  );
}