import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';
import DayList from './DayList';
// import InterviewerList from './InterviewerList';
import Appointment from './Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: Object.values(all[0].data),
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log('DailyAppts: ', dailyAppointments);
  console.log('DailyInterviewers: ', dailyInterviewers);

  const AppointmentsArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    console.log('APPT: ', appointment);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        save={save}
        back={() => 'back'}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList days={state.days} value={state.day} onChange={setDay} />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {AppointmentsArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
