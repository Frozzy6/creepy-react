import Immutable from 'immutable';

export const APP_DATA = 'APP_DATA';

const initState = Immutable.Map({
  logoNumber: Math.floor(Math.random() * 5) + 1,
});

export default function shots(state = initState, action) {
  switch(action.type) {
    case APP_DATA:
    default:
      return state;
  }
}
