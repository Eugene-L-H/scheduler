import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    if (!replace) history.push(newMode);
    setMode(newMode);
  };

  const back = function () {
    if (history.length === 1) return;
    // Remove current mode setting, set mode to last item in history array
    history.pop();
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
}
