const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://db:27017';

// Database Name
const dbName = 'myproject';

async function connectDb() {
  let client = null;
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, {
    reconnectTries: 60,
    reconnectInterval: 1000
  });

  console.log('DB CONNECT OK');
  const db = client.db(dbName);
  return db;
}

module.exports = {
  connectDb
};
