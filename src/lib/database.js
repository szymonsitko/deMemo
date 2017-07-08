import Realm from 'realm';

export const createDatabaseSchema = () => {
  class Items {}
  Items.schema = {
    name: 'Items',
    primaryKey: 'title',
    properties: {
        title: 'string',
        content: {type: 'string', default: 'Empty description'},
        date: 'int',
    },
  };
  return Items.schema;
}

export const realmDatabase = new Realm({schema: [createDatabaseSchema()]});

export const createTitlesArray = databaseQuery => {
  let titlesAndDatesArray = [];
  for (let i = 0; i < databaseQuery.length; i++ ) {
    let titleAndDate = {};
    titleAndDate['title'] = databaseQuery[i].title;
    titleAndDate['date'] = databaseQuery[i].date
    titlesAndDatesArray.push(titleAndDate);
  }
  return titlesAndDatesArray;
}
