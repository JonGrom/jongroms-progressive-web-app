import { openDB } from 'idb';

//define database
const DB_NAME = "jate"

//initialize database 
const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


//save updated content to IndexedDB
export const putDb = async (content) => {
  
  const open = await openDB(DB_NAME, 1);

  const transaction = open.transaction(DB_NAME, 'readwrite');

  const store = transaction.objectStore(DB_NAME);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

//get database content
export const getDb = async () => {

  const open = await openDB(DB_NAME, 1);
  
  const transaction = open.transaction(DB_NAME, 'readonly');

  const store = transaction.objectStore(DB_NAME);

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
