import {
  INITIALIAZE_DATABASE_OBJECT,
  DATABASE_SINGE_ITEM_QUERY,
  RESET_DATABASE_QUERY,
  DATABASE_ALL_ITEMS_QUERY,
  ADD_NEW_DATABASE_ITEM,
  REMOVE_DATABASE_SINGLE_ITEM
} from '../actions/types';

const INITIAL_STATE = {
  input: '',
  query: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIAZE_DATABASE_OBJECT:
      return {
        ...state,
        database_schema: action.payload.databaseSchema,
        all_records: action.payload.allRecordsQuery
      };
    case ADD_NEW_DATABASE_ITEM:
    case DATABASE_ALL_ITEMS_QUERY:
    case REMOVE_DATABASE_SINGLE_ITEM:
      return { ...state, all_records: action.payload, query: {}};
    case DATABASE_SINGE_ITEM_QUERY:
      return { ...state, query: action.payload };
    case RESET_DATABASE_QUERY:
      return INITIAL_STATE;
    default:
      return state;
  }
};
