import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    if (!replace){
      history.push(newMode);
    }
    setMode(newMode);
  };



  return { mode, transition }
};
