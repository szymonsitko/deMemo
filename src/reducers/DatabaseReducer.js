import { INITIALIAZE_DATABASE_OBJECT } from '../actions/types';

const INITIAL_STATE = {
  input: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case INITIALIAZE_DATABASE_OBJECT:
      return { ...state, database_schema: action.payload };
    default:
      return state;
  }
};
