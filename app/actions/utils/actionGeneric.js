import {
  START,
  SUCCESS,
  FAIL,
} from '../baseActions';

const genericAC = function() {
  const [type, actionType, payload] = arguments;
  const baseAction = {
    type: actionType + type
  };
  return ( payload ? { ...baseAction, payload } : baseAction );
}

export const genericStartAC = (...args) => genericAC(START, ...args);
export const genericSuccessAC = (...args) => genericAC(SUCCESS, ...args);
export const genericFailAC = (...args) => genericAC(FAIL, ...args);
