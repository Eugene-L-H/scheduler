export function getAppointmentsForDay(state, day) {
  let appointmentObjs = [];
  for (let stateDay of state.days) {
    if (stateDay.name === day) {
      let appointmentIds = stateDay.appointments;

      for (let id of appointmentIds) {
        appointmentObjs.push(state.appointments[id]);
      }
    }
  }
  return appointmentObjs;
}

export function getInterview(state, interviewId) {
  const interviewObj = {};

  // Return null if no interview booked for that time.
  if (interviewId === null) return null;

  const interviewerId = interviewId.interviewer;

  interviewObj['student'] = interviewId.student;
  interviewObj['interviewer'] = state.interviewers[interviewerId];

  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  let interviewerObjs = [];
  const appointmentsObjs = getAppointmentsForDay(state, day);

  appointmentsObjs.map((appointment) => {
    if (appointment.interview !== null) {
      interviewerObjs.push(
        state.interviewers[appointment.interview.interviewer]
      );
    }
  });

  return interviewerObjs;
}
