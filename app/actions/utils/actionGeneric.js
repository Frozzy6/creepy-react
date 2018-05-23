cosnt TYPES = {
  START: '_START',
  SUCCESS: '_SUCCESS',
  FAIL: '_FAIL',
}

const genericAC = (action, payload, type) => ({
  type: action + type,
  payload
})

export const genericStartAC = function(..args) {
  return genericAC(..args, TYPES.START);
}

export const genericSuccessAC = function(...args) {
  return genericAC(..args, TYPES.SUCCESS);
};

export const genericFailAC = function(action, payload) {
  return genericAC(..args, TYPES.FAIL);
}
