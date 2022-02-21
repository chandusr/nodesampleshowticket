const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
let db;
const initDb = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(uri, {}, (err, database) => {
      if (err) return reject();
      db = database.db('nodeTest');
      console.log('Database Connected');
      return resolve();
    });
  });
const getDb = (collectionToGet) => db.collection(collectionToGet);
module.exports = {
  initDb,
  getDb,
};