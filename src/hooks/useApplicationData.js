import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

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

  const updateSpots = (state, appointments, id) => {
    const interviewStateBefore = state.appointments[id].interview;
    const interviewStateAfter = appointments[id].interview;
    let modifier = 0;

    // Handle Update
    if (interviewStateBefore !== null && interviewStateAfter !== null) {
      modifier = 0;
    }

    // Handle Delete
    else if (interviewStateBefore !== null && interviewStateAfter === null) {
      modifier = 1;
    }

    // Handle Create
    else if (interviewStateBefore === null && interviewStateAfter !== null) {
      modifier = -1;
    }

    const updatedDays = state.days.map((day) => {
      // Find the day where the appointments array includes the ID
      if (day.appointments.includes(id)) {
        // Update the spots value with the appropriate modifier
        return { ...day, spots: day.spots + modifier };
      }
      return day;
    });

    return updatedDays;
  };

  const cancelInterview = function (id) {
    // Set appointment with [id]
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments, id);
      setState({ ...state, days, appointments });
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { ...appointment }).then(() => {
      const days = updateSpots(state, appointments, id);
      setState({ ...state, days, appointments });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
