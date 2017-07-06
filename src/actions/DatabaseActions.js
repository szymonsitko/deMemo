import Realm from 'realm';
import {
  INITIALIAZE_DATABASE_OBJECT,
  DATABASE_ITEMS_QUERY,
  RESET_DATABASE_QUERY
} from './types';
import { DATABASE_NAME } from '../constants';
import { createDatabaseSchema, realmDatabase } from '../lib/database';

export const initializeDatabaseObject = () => {
  const databaseSchema = createDatabaseSchema();
  const realm = new Realm({schema: [databaseSchema]});

  // Control query
  console.log(realm.objects('Items'));

  return {
    type: INITIALIAZE_DATABASE_OBJECT,
    payload: databaseSchema
  }
}

export const addNewDatabaseItem = (title, description) => {
  return (dispatch) => {
    realmDatabase.write(() => {
    savedItems = realmDatabase.create(DATABASE_NAME, {
        title: title,
        content: description,
        date: Date.now()
      });
    });
  }
}

export const queryDatabase = itemTitle => {
  let queryItems = {};
  const items = realmDatabase.objects(DATABASE_NAME);
  for (let i = 0; i < items.length; i++) {
    if (items[i].title.contains(itemTitle)) {
      queryItems[i] = {
        title: items[i].title, content: items[i].content, date: items[i].date
      };
    };
  }
  return {
    type: DATABASE_ITEMS_QUERY,
    payload: queryItems
  };
}


export const resetQuery = () => {
  return {
    type: RESET_DATABASE_QUERY
  }
}
