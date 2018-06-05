import { fromJS } from 'immutable';

const LOGOS_COUNT = 6;

const initState = fromJS({
  logoNumber: Math.round(Math.random() * LOGOS_COUNT),
  emv: null,
  deviceType: null,
  loading: false,
});

export default function appReducer(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
