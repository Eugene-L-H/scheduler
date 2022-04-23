export function getAppointmentsForDay(state, day) {
  let appointmentObjs = [];
  for (let stateDay of state.days) {
    if (stateDay.name === day) {
      let appointmentIds = stateDay.appointments;

      for(let id of appointmentIds) {
        appointmentObjs.push(state.appointments[id]);
      }
    }
  }
  return appointmentObjs;
}

export function getInterview(state, interview) {
  const interviewObj = {};

  // Return null if no interview booked for that time.
  if (interview === null) return null;

  const interviewerId = interview.interviewer;

  interviewObj['student'] = interview.student;
  interviewObj['interviewer'] = state.interviewers[interviewerId];
  
  return interviewObj;
}

