import Realm from 'realm';
import {
  INITIALIAZE_DATABASE_OBJECT,
  DATABASE_ITEMS_QUERY,
  RESET_DATABASE_QUERY,
  DATABASE_ALL_ITEMS_QUERY
} from './types';
import { DATABASE_NAME } from '../constants';
import { createDatabaseSchema, realmDatabase } from '../lib/database';

const createTitlesArray = databaseQuery => {
  let titlesArray = [];
  for (let i = 0; i < databaseQuery.length; i++ ) {
    titlesArray.push(databaseQuery[i].title);
  }
  return titlesArray;
}

export const initializeDatabaseObject = () => {
  const databaseSchema = createDatabaseSchema();
  const realm = new Realm({schema: [databaseSchema]});
  const allRecordsQuery = realm.objects(DATABASE_NAME);
  const titlesArray = createTitlesArray(allRecordsQuery);
  return {
    type: INITIALIAZE_DATABASE_OBJECT,
    payload: { databaseSchema, allRecordsQuery, titlesArray }
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

export const getAllRecords = () => {
  const items = realmDatabase.objects(DATABASE_NAME);
  const titlesArray = createTitlesArray(items);
  return {
    type: DATABASE_ALL_ITEMS_QUERY,
    payload: { items, titlesArray }
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
    type: DATABASE_ITEMS_QUERY,
    payload: queryItems
  };
}


export const resetQuery = () => {
  return {
    type: RESET_DATABASE_QUERY
  }
}
