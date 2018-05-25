import {
  START,
  SUCCESS,
  FAIL,
} from '../baseActions';

// TODO: rewrite
// I want to call this function as
// genericAC({
//  type: 'ACTION',
//  sub: '_START',
//  payload { a: 1}
// })
// It's make call generic clean with or without concat types
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
