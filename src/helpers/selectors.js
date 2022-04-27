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

export function getInterviewersForDay(state, selectedDay) {
  if (state.days.length === 0) {
    return [];
  }

  const matchingInterviews = state.days.filter(
    (day) => day.name === selectedDay
  );

  return matchingInterviews.length === 0
    ? []
    : matchingInterviews[0].interviewers.map((id) => state.interviewers[id]);
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
