import Realm from 'realm';
import {
  INITIALIAZE_DATABASE_OBJECT
} from './types';
import { createDatabaseSchema, realmDatabase } from '../lib/database';

export const initializeDatabaseObject = () => {
  const databasSchema = createDatabaseSchema();
  const realm = new Realm({schema: [databasSchema]});
  return {
    type: INITIALIAZE_DATABASE_OBJECT,
    payload: databasSchema
  }
}
