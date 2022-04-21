import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      { props.interview ? 
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        /> 
        :
        <Empty />}
    </article>
  );
}