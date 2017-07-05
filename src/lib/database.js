import Realm from 'realm';

export const createDatabaseSchema = () => {
  class Items {}
  Items.schema = {
    name: 'Items',
    primaryKey: 'title',
    properties: {
        title: 'string',
        content: {type: 'string', default: 'Item description here'},
    },
  };
  return Items.schema;
}

export const realmDatabase = new Realm({schema: [createDatabaseSchema()]});
