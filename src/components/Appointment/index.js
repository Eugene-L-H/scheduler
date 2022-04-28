import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onDelete = function (id) {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const confirmDelete = function () {
    transition(CONFIRM);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
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
            onDelete={confirmDelete}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            student={props.interview != null ? props.interview.student : ''}
            interviewer={props.interviewer}
            interviewers={props.interviewers}
            save={save}
            back={back}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            save={save}
            back={back}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            onClose={() => back()}
            message="Error, cannot save appointment. Please try again."
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            onClose={() => back()}
            message="Error, cannot delete appointment. Please try again."
          />
        )}
        {mode === SAVING && <Status message={'Saving'} />}
        {mode === DELETING && <Status message={'Deleting'} />}
        {mode === CONFIRM && (
          <Confirm
            onConfirm={() => onDelete(props.id)}
            onCancel={() => transition(SHOW)}
            message="Confirm Delete?"
          />
        )}{' '}
      </article>
    </Fragment>
  );
}
