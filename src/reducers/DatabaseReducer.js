import {
  INITIALIAZE_DATABASE_OBJECT,
  DATABASE_ITEMS_QUERY,
  RESET_DATABASE_QUERY
} from '../actions/types';

const INITIAL_STATE = {
  input: '',
  query: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIAZE_DATABASE_OBJECT:
      return { ...state, database_schema: action.payload };
    case DATABASE_ITEMS_QUERY:
      return { ...state, query: action.payload };
    case RESET_DATABASE_QUERY:
      return INITIAL_STATE;
    default:
      return state;
  }
};
