// why? so that we can check if a book is added or removed
// need to create a state where it stores the previous state unless of current state
// how to get the previous state?
// pass the current state to usePrevState
// use the current state as the new state of the usePrevState hook
// now use the use prevState for comparison operations
// update the current state
// check if prev is not the same as the current one
// update the prev state

import { useEffect, useRef } from "react";

const usePrevState = (currentState) => {
  const prevState = useRef(currentState);
  useEffect(() => {
    if (currentState !== prevState) prevState.current = currentState;
  }, [currentState]);
  return prevState.current;
};

export default usePrevState;
