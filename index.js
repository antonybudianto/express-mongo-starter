const express = require('express');
const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Connection URL
const url = 'mongodb://db:27017';

// Database Name
const dbName = 'myproject';

async function start() {
  let client = null;

  try {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(url, {
      reconnectTries: 60,
      reconnectInterval: 1000
    });

    console.log('CONNECT OK')

    const db = client.db(dbName);

    app.get('/hello', (req, res) => {
      insertDocuments(db, () => {
        res.send('OK')
      });
    });

    app.listen(3000);

    console.log('API live at http://localhost:3000/hello');
  } catch (err) {
    console.log(err.stack);
  }

  if (client) {
    client.close();
  }
}

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

start();
