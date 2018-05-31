import { fromJS } from 'immutable';

const initState = fromJS({
  logoNumber: Math.floor(Math.random() * 5) + 1,
});

export default function appReducer(state = initState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
