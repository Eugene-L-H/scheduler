import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [student, setStudent] = useState(props.student || '');
  const [error, setError] = useState('');

  const reset = function () {
    setStudent('');
    setInterviewer(null);
  };

  const validate = function () {
    if (student === '') {
      setError('Student name can not be empty');
      return;
    }

    if (interviewer === null) {
      setError('Please select an interviewer');
      return;
    }

    setError('');
    props.save(student, interviewer);
  };

  const cancel = function () {
    reset();
    props.back();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
