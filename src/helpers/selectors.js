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