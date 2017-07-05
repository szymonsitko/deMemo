import Realm from 'realm';
import {
  INITIALIAZE_DATABASE_OBJECT
} from './types';
import { DATABASE_NAME } from '../constants';
import { createDatabaseSchema, realmDatabase } from '../lib/database';

export const initializeDatabaseObject = () => {
  const databasSchema = createDatabaseSchema();
  const realm = new Realm({schema: [databasSchema]});

  // Control query
  console.log(realm.objects('Items'));

  return {
    type: INITIALIAZE_DATABASE_OBJECT,
    payload: databasSchema
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
