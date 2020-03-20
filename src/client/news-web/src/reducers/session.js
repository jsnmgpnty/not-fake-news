import {
  IS_ONLINE,
} from '../actions/session';

const initialState = {
  isOnline: null,
};

const session = (state = initialState, action) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case IS_ONLINE:
      return { ...state, isOnline: action.payload };
    default:
      return state;
  }
};

export default session;
