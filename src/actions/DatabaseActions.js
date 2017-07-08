import Realm from 'realm';
import {
  INITIALIAZE_DATABASE_OBJECT,
  DATABASE_ITEMS_QUERY,
  RESET_DATABASE_QUERY,
  DATABASE_ALL_ITEMS_QUERY,
  ADD_NEW_DATABASE_ITEM,
  DATABASE_SINGE_ITEM_QUERY,
  REMOVE_DATABASE_SINGLE_ITEM
} from './types';
import { DATABASE_NAME } from '../constants';
import { createDatabaseSchema, realmDatabase } from '../lib/database';

export const initializeDatabaseObject = () => {
  const databaseSchema = createDatabaseSchema();
  const realm = new Realm({schema: [databaseSchema]});
  const allRecordsQuery = realm.objects(DATABASE_NAME);
  return {
    type: INITIALIAZE_DATABASE_OBJECT,
    payload: { databaseSchema, allRecordsQuery }
  }
}

export const addNewDatabaseItem = (title, description) => {
  realmDatabase.write(() => {
    savedItems = realmDatabase.create(DATABASE_NAME, {
      title: title,
      content: description,
      date: Date.now()
    }, true);
  });
  const items = realmDatabase.objects(DATABASE_NAME);
  return {
    type: ADD_NEW_DATABASE_ITEM,
    payload: items
  };
}

export const removeDatabaseItem = itemTitle => {
  const items = realmDatabase.objects(DATABASE_NAME);
  const itemToDelete = items.filtered(`title = "${itemTitle}"`);
  realmDatabase.write(() => {
    realmDatabase.delete(itemToDelete);
  });
  const updatedItems = realmDatabase.objects(DATABASE_NAME);
  return {
    type: REMOVE_DATABASE_SINGLE_ITEM,
    payload: updatedItems
  }
}


export const getAllRecords = () => {
  const items = realmDatabase.objects(DATABASE_NAME);
  return {
    type: DATABASE_ALL_ITEMS_QUERY,
    payload: items
  };
}

export const queryDatabase = itemTitle => {
  let queryItems = {};
  const items = realmDatabase.objects(DATABASE_NAME);
  const record = items.filtered(`title = "${itemTitle}"`);
  if (Object.keys(record).length > 0) {
    queryItems[0] = record[0];
  }
  return {
    type: DATABASE_SINGE_ITEM_QUERY,
    payload: queryItems
  };
}

export const resetQuery = () => {
  return {
    type: RESET_DATABASE_QUERY
  }
}
