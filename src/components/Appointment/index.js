import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  return (
    <Fragment>
      <Header time={props.time}></Header>
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            bookInterview={props.bookInterview}
          />
        )}

        {mode === CREATE && (
          <Form
            student={props.interview != null ? props.interview.student : ''}
            interviewer={props.interviewer}
            interviewers={props.interviewers}
            save={save}
            back={back}
            // bookInterview={props.bookInterview(props.id, props.interview)}
          />
        )}
      </article>
    </Fragment>
  );
}
